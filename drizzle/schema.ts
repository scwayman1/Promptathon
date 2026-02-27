import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Teams table — a team has a name and a captain (contact person).
 */
export const teams = mysqlTable("teams", {
  id: int("id").autoincrement().primaryKey(),
  teamName: varchar("teamName", { length: 200 }).notNull(),
  captainName: varchar("captainName", { length: 200 }).notNull(),
  captainEmail: varchar("captainEmail", { length: 320 }).notNull(),
  captainDepartment: varchar("captainDepartment", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;

/**
 * Team members — additional members on a team (beyond the captain).
 */
export const teamMembers = mysqlTable("team_members", {
  id: int("id").autoincrement().primaryKey(),
  teamId: int("teamId").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  department: varchar("department", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;

/**
 * Individual registrations — people who want to attend but don't have a team yet.
 */
export const individualRegistrations = mysqlTable("individual_registrations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  department: varchar("department", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IndividualRegistration = typeof individualRegistrations.$inferSelect;
export type InsertIndividualRegistration = typeof individualRegistrations.$inferInsert;
