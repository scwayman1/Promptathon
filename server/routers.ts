import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createTeamRegistration,
  createIndividualRegistration,
  getRegistrationStats,
  checkEmailExists,
  getAllTeams,
  getAllIndividuals,
} from "./db";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  department: z.string().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  registration: router({
    /** Register a team with captain + optional additional members */
    registerTeam: publicProcedure
      .input(
        z.object({
          teamName: z.string().min(1, "Team name is required").max(200),
          captainName: z.string().min(1, "Captain name is required").max(200),
          captainEmail: z.string().email("Valid email is required"),
          captainDepartment: z.string().max(200).optional(),
          members: z.array(teamMemberSchema).max(9), // up to 9 additional members (10 total with captain)
        })
      )
      .mutation(async ({ input }) => {
        // Check if captain email is already registered
        const captainExists = await checkEmailExists(input.captainEmail);
        if (captainExists) {
          throw new Error("This email is already registered. Each person can only register once.");
        }

        // Check if any member email is already registered
        for (const member of input.members) {
          const memberExists = await checkEmailExists(member.email);
          if (memberExists) {
            throw new Error(`${member.email} is already registered. Each person can only register once.`);
          }
        }

        const teamId = await createTeamRegistration(
          {
            teamName: input.teamName,
            captainName: input.captainName,
            captainEmail: input.captainEmail,
            captainDepartment: input.captainDepartment ?? null,
          },
          input.members.map((m) => ({
            name: m.name,
            email: m.email,
            department: m.department ?? null,
          }))
        );

        return { success: true, teamId };
      }),

    /** Register as an individual (will be placed on a team at the event) */
    registerIndividual: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(200),
          email: z.string().email("Valid email is required"),
          department: z.string().max(200).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const exists = await checkEmailExists(input.email);
        if (exists) {
          throw new Error("This email is already registered. Each person can only register once.");
        }

        const id = await createIndividualRegistration({
          name: input.name,
          email: input.email,
          department: input.department ?? null,
        });

        return { success: true, id };
      }),

    /** Get registration stats (public — shown on the landing page) */
    stats: publicProcedure.query(async () => {
      return getRegistrationStats();
    }),

    /** Admin: list all teams */
    listTeams: publicProcedure.query(async () => {
      return getAllTeams();
    }),

    /** Admin: list all individuals */
    listIndividuals: publicProcedure.query(async () => {
      return getAllIndividuals();
    }),
  }),
});

export type AppRouter = typeof appRouter;
