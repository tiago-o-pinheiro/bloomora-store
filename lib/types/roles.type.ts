export const roles = ["USER", "ADMIN"] as const;
export type Roles = (typeof roles)[number];
