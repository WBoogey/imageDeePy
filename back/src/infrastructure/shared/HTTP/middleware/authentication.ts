import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).end();
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET!);
    (req as any).userId = (payload as any).sub;
    next();
  } catch(e) {
    return res.status(401).end();
  }
}

// src/infrastructure/shared/HTTP/middleware/authentication.ts
import { Request } from "express";         // adapte le chemin !
import config from "../../../core/config";

/**
 * Middleware utilisé par Tsoa pour tous les schémas `security`.
 * Le nom `expressAuthentication` doit correspondre à celui déclaré
 * dans tsoa.json  ➜  "authenticationModule".
 */
export async function expressAuthentication(
  req: Request,
  securityName: string,
  scopes?: string[]
): Promise<unknown> {
  if (securityName !== "jwt") {
    throw new Error(`Unknown security scheme: ${securityName}`);
  }

  const bearer = req.headers.authorization;
  if (!bearer?.startsWith("Bearer ")) {
    throw new Error("No Bearer token found");
  }

  const token = bearer.slice(7);
  const payload = jwt.verify(token, config.JWT_SECRET!);
  // Tu peux vérifier les scopes ici si besoin…

  return payload;                  // sera injecté dans les contrôleurs
}

