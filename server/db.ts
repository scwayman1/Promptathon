import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, teams, teamMembers, individualRegistrations, InsertTeam, InsertTeamMember, InsertIndividualRegistration } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Registration Queries ───

export async function createTeamRegistration(
  team: InsertTeam,
  members: Omit<InsertTeamMember, "teamId">[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(teams).values(team).$returningId();
  const teamId = result.id;

  if (members.length > 0) {
    await db.insert(teamMembers).values(
      members.map((m) => ({ ...m, teamId }))
    );
  }

  return teamId;
}

export async function createIndividualRegistration(
  reg: InsertIndividualRegistration
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(individualRegistrations).values(reg).$returningId();
  return result.id;
}

export async function getAllTeams() {
  const db = await getDb();
  if (!db) return [];

  const allTeams = await db.select().from(teams).orderBy(teams.createdAt);
  const allMembers = await db.select().from(teamMembers).orderBy(teamMembers.createdAt);

  return allTeams.map((t) => ({
    ...t,
    members: allMembers.filter((m) => m.teamId === t.id),
  }));
}

export async function getAllIndividuals() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(individualRegistrations).orderBy(individualRegistrations.createdAt);
}

export async function getRegistrationStats() {
  const db = await getDb();
  if (!db) return { teamCount: 0, teamMemberCount: 0, individualCount: 0, totalAttendees: 0 };

  const [teamCountResult] = await db.select({ count: sql<number>`count(*)` }).from(teams);
  const [memberCountResult] = await db.select({ count: sql<number>`count(*)` }).from(teamMembers);
  const [individualCountResult] = await db.select({ count: sql<number>`count(*)` }).from(individualRegistrations);

  const teamCount = Number(teamCountResult?.count ?? 0);
  // Team captains are counted as attendees too
  const teamMemberCount = Number(memberCountResult?.count ?? 0) + teamCount;
  const individualCount = Number(individualCountResult?.count ?? 0);

  return {
    teamCount,
    teamMemberCount,
    individualCount,
    totalAttendees: teamMemberCount + individualCount,
  };
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const [teamCaptain] = await db.select({ id: teams.id }).from(teams).where(eq(teams.captainEmail, email)).limit(1);
  if (teamCaptain) return true;

  const [member] = await db.select({ id: teamMembers.id }).from(teamMembers).where(eq(teamMembers.email, email)).limit(1);
  if (member) return true;

  const [individual] = await db.select({ id: individualRegistrations.id }).from(individualRegistrations).where(eq(individualRegistrations.email, email)).limit(1);
  if (individual) return true;

  return false;
}
