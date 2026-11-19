import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(3, 'Valid email required!'),
  password: z.string().min(6, 'Valid Password required!'),
});

export type Users = {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
};
