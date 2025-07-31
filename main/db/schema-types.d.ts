import { users, individuals, images, battalions } from "./schema";

export type User = typeof users.$inferSelect;
export type Image = typeof images.$inferSelect;

export type Individual = typeof individuals.$inferSelect;
export type NewIndividual = typeof individuals.$inferInsert;

export type Battalion = typeof battalions.$inferSelect;
export type NewBattalion = typeof battalions.$inferInsert;
