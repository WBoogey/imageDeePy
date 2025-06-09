import { z } from 'zod';

const ImageInput = z.object({
  userId: z.number(),
  prompt: z.string(),
  imageUrl: z.string(),
  createdAt: z.date(),
});

export type ImageInputDTO = z.infer<typeof ImageInput>;

const ImageOutput = z.object({
  id : z.number(),
  userId: z.number(),
  prompt: z.string(),
  imageUrl: z.string(),
  createdAt: z.date(),
});
export type ImageOutputDTO = z.infer<typeof ImageOutput>;