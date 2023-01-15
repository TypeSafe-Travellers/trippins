import { z } from "zod";

/**
 * Edit Profile UserName Types
 */
const updateUserNameSchema = z.object({
  newName: z.string().min(1).max(50),
});

/**
 * Edit Profile Email Types
 */
const updateUserEmailSchema = z.object({
  newEmail: z.string().email(),
});

export type UpdateUserNameType = z.infer<typeof updateUserNameSchema>;
export type UpdateUserEmailType = z.infer<typeof updateUserEmailSchema>;
