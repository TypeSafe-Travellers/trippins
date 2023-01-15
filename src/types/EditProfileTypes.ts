import { z } from "zod";

/**
 * Edit Profile UserName Types
 */
const updateUserNameSchema = z.object({
  newName: z.string().min(1).max(50),
  email: z.string().email(),
});

export type UpdateUserNameType = z.infer<typeof updateUserNameSchema>;
