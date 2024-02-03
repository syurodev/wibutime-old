import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { text, timestamp, pgTable, json, boolean, integer, primaryKey, uuid, serial, date } from "drizzle-orm/pg-core";
import type { AdapterAccount } from '@auth/core/adapters'

export const user = pgTable("user", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  username: text("username").unique(),
  image: text("image"),
  description: json("description"),
  email: text("email").notNull().unique(),
  phone: text("phone").unique(),
  hashedPassword: text("hashed_password"),
  emailVerified: boolean("emailVerified").default(false),
  phoneVerified: boolean("phoneVerified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = InferSelectModel<typeof user>
export type UserInsert = InferInsertModel<typeof user>

export const userRelations = relations(user, ({ one, many }) => ({
  roles: many(userOnRole),
}));

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
)

export const role = pgTable("role", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export type Role = InferSelectModel<typeof role>
export type RoleInsert = InferInsertModel<typeof role>

export const roleRelations = relations(role, ({ many }) => ({
  users: many(userOnRole),
  permission: many(permissionOnRole),
}));

export const userOnRole = pgTable(
  "user_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    roleId: uuid("role_id")
      .notNull()
      .references(() => role.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.roleId),
  })
);

export const userOnRoleRelations = relations(userOnRole, ({ one }) => ({
  user: one(user, {
    fields: [userOnRole.userId],
    references: [user.id]
  }),

  role: one(role, {
    fields: [userOnRole.roleId],
    references: [role.id]
  })
}))

export const permission = pgTable("permission", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export type Permission = InferSelectModel<typeof permission>
export type PermissionInsert = InferInsertModel<typeof permission>

export const permissionRelations = relations(permission, ({ many }) => ({
  roles: many(permissionOnRole),
}));

export const permissionOnRole = pgTable("permission_role", {
  roleId: uuid("role_id")
    .notNull()
    .references(() => role.id),
  permissionId: uuid("permission_id")
    .notNull()
    .references(() => permission.id),
}, (t) => ({
  pk: primaryKey(t.roleId, t.permissionId),
}))

export const permissionOnRoleRelations = relations(permissionOnRole, ({ one }) => ({
  permission: one(permission, {
    fields: [permissionOnRole.permissionId],
    references: [permission.id]
  }),

  role: one(role, {
    fields: [permissionOnRole.roleId],
    references: [role.id]
  })
}))

export const verificationToken = pgTable("verification_token", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  expires: date("expires").notNull()
})

export type VerificationToken = InferSelectModel<typeof verificationToken>
export type VerificationTokenInsert = InferInsertModel<typeof verificationToken>

export const resetPasswordToken = pgTable("reset_password_token", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  expires: date("expires").notNull()
})

export type ResetPasswordToken = InferSelectModel<typeof resetPasswordToken>
export type ResetPasswordTokenInsert = InferInsertModel<typeof resetPasswordToken>