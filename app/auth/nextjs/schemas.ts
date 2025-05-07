import { z } from "zod"

export const oAuthProviders = ["discord", "github", "google"] as const
export type OAuthProvider = (typeof oAuthProviders)[number]

export const userRoles = ["USER", "ADMIN"] as const;
export type UserRole = (typeof userRoles)[number];