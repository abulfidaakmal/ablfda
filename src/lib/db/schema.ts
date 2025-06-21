import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const roleEnum = pgEnum("ROLE", ["USER", "ADMIN"]);

const users = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  role: roleEnum().default("USER").notNull(),
  email: varchar({ length: 100 }).unique().notNull(),
  password: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export { users, roleEnum };
