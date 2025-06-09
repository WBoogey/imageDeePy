import { z } from 'zod';

// Schéma pour la connexion (SignIn)
export const SignInBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SingInDTO = z.infer<typeof SignInBody>;

// Schéma pour l'inscription (SignUp)
export const SignUpBody = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

export type SignUpDTO = z.infer<typeof SignUpBody>;

// Schéma pour la réponse d'authentification
const AuthResponse = z.object({
  id: z.number(),
  passwordHash: z.string(),
  email: z.string().email(),
  userName: z.string().min(1),
  token: z.string(),
  createdAt: z.date()
});

export type AuthResponseDto = z.infer<typeof AuthResponse>;