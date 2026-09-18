import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  company: text("company"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  interest: text("interest").notNull(),
  message: text("message"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
