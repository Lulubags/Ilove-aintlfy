import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  industry: text("industry"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  messages: json("messages").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  industry: true,
  message: true,
}).extend({
  industry: z.string().optional(),
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).pick({
  sessionId: true,
  messages: true,
});

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.string(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
