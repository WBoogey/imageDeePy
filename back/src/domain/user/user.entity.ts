import { createHmac } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { env } from 'node:process';
import { z } from 'zod';

export interface UserProps {
  id: number;
  username:string;
  email: string;
  Carbon_footprint: string;
  passwordHash: string;
  createdAt: string | null;
}
