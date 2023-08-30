import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar, int, boolean, bigint } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  username: varchar('username', { length: 120 }),
  tagline: varchar('tagline', { length: 250 }),
  img_url: varchar('img_url', { length: 500 }),
  website_url: varchar('website_url', { length: 500 }),
  twitter_url: varchar('twitter_url', { length: 500 }),
  facebook_url: varchar('facebook_url', { length: 500 }),
  instagram_url: varchar('instagram_url', { length: 500 }),
  twitch_url: varchar('twitch_url', { length: 500 }),
  threads_url: varchar('threads_url', { length: 500 }),
})

export const userLinks = mysqlTable('user_links', {
  id: serial('id').primaryKey(),
  type: int('type'),
  is_public: boolean('is_public'),
  tagline: varchar('tagline', { length: 250 }),
})

export const userRolePings = mysqlTable('user_role_pings', {
  id: serial('id').primaryKey(),
  role_id: varchar('role_id', { length: 20 }),
  user_id: int('user_id')
})

export const userXp = mysqlTable('user_xp', {
  user_id: bigint('user_id', { mode: 'bigint' }).primaryKey(),
  last_applied_time: bigint('last_applied_time', { mode: 'number' }),
  current_xp: bigint('current_xp', { mode: 'number' }),
  multiplier: int('multiplier'),
  pentalty_count: int('pentalty_count')
})

export const spaces = mysqlTable('spaces', {
  id: serial('id').primaryKey(),
  space_url: varchar('space_url', { length: 300 })
})

export const user_userXpRelations = relations(userXp, ({ one }) => ({
  user: one(users, {
    fields: [userXp.user_id],
    references: [users.id]
  })
}));

export const userXp_userRelations = relations(users, ({ one }) => ({
  userXp: one(userXp, {
    fields: [users.id],
    references: [userXp.user_id]
  })
}))

// export const usersRelations = relations(users, ({ many }) => ({
//   blocks: many(blocks)
// }));

// export const blocks = mysqlTable('blocks', {
//   id: serial('id').primaryKey(),
//   url: varchar('url', { length: 200 }),
//   block_type: int('type'),
//   user_id: int('user_id'),
//   label: varchar('label', { length: 200 }),
// });

// export const blocksRelations = relations(blocks, ({ one }) => ({
//   user: one(users, {
//     fields: [blocks.user_id],
//     references: [users.id]
//   })
// }))

// export const sections = mysqlTable('sections', {
//   id: serial('id').primaryKey(),
//   user_id: int('user_id'),
//   size: int('size'), 
//   display_order: int('display_order')
// })