import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so tests don't hit a real database
vi.mock("./db", () => {
  const registeredEmails = new Set<string>();
  let teamIdCounter = 1;
  let individualIdCounter = 1;

  return {
    createTeamRegistration: vi.fn(async (team: any, members: any[]) => {
      registeredEmails.add(team.captainEmail);
      members.forEach((m: any) => registeredEmails.add(m.email));
      return teamIdCounter++;
    }),
    createIndividualRegistration: vi.fn(async (reg: any) => {
      registeredEmails.add(reg.email);
      return individualIdCounter++;
    }),
    getRegistrationStats: vi.fn(async () => ({
      teamCount: 2,
      teamMemberCount: 6,
      individualCount: 3,
      totalAttendees: 9,
    })),
    checkEmailExists: vi.fn(async (email: string) => registeredEmails.has(email)),
    getAllTeams: vi.fn(async () => []),
    getAllIndividuals: vi.fn(async () => []),
    // Keep existing db exports
    getDb: vi.fn(async () => null),
    upsertUser: vi.fn(),
    getUserByOpenId: vi.fn(),
  };
});

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("registration.registerTeam", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a team with captain only (no additional members)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.registerTeam({
      teamName: "The Innovators",
      captainName: "Scott Test",
      captainEmail: "scott-unique-1@coastline.edu",
      captainDepartment: "IT",
      members: [],
    });

    expect(result).toMatchObject({ success: true });
    expect(result.teamId).toBeDefined();
    expect(typeof result.teamId).toBe("number");
  });

  it("registers a team with captain and additional members", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.registerTeam({
      teamName: "Team Alpha",
      captainName: "Alice",
      captainEmail: "alice-unique@coastline.edu",
      captainDepartment: "Marketing",
      members: [
        { name: "Bob", email: "bob-unique@coastline.edu", department: "IT" },
        { name: "Carol", email: "carol-unique@coastline.edu" },
      ],
    });

    expect(result.success).toBe(true);
    expect(result.teamId).toBeDefined();
  });

  it("rejects registration with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.registerTeam({
        teamName: "Bad Team",
        captainName: "Test",
        captainEmail: "not-an-email",
        members: [],
      })
    ).rejects.toThrow();
  });

  it("rejects registration with empty team name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.registerTeam({
        teamName: "",
        captainName: "Test",
        captainEmail: "test@coastline.edu",
        members: [],
      })
    ).rejects.toThrow();
  });

  it("rejects registration with empty captain name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.registerTeam({
        teamName: "Good Team",
        captainName: "",
        captainEmail: "test@coastline.edu",
        members: [],
      })
    ).rejects.toThrow();
  });
});

describe("registration.registerIndividual", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers an individual successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.registerIndividual({
      name: "Jane Doe",
      email: "jane-unique@coastline.edu",
      department: "Student Services",
    });

    expect(result).toMatchObject({ success: true });
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe("number");
  });

  it("registers an individual without department", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.registerIndividual({
      name: "John Smith",
      email: "john-unique@coastline.edu",
    });

    expect(result.success).toBe(true);
  });

  it("rejects individual registration with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.registerIndividual({
        name: "Test",
        email: "bad-email",
      })
    ).rejects.toThrow();
  });

  it("rejects individual registration with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.registerIndividual({
        name: "",
        email: "test@coastline.edu",
      })
    ).rejects.toThrow();
  });
});

describe("registration.stats", () => {
  it("returns registration statistics", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.registration.stats();

    expect(stats).toMatchObject({
      teamCount: expect.any(Number),
      teamMemberCount: expect.any(Number),
      individualCount: expect.any(Number),
      totalAttendees: expect.any(Number),
    });
  });
});
