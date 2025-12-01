import { z } from "zod";

export const slugSchema = z.string().min(1, "Slug is required");

export const identifierSchema = z.string().min(1, "Identifier is required");

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be at most 30 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens");
