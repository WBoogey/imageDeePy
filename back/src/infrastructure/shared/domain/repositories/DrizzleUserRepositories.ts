import { UserRepository } from "../../../../domain/user/user.repository";
import { AuthResponseDto, SignUpDTO, SingInDTO } from "../../../../domain/user/user.dto";
import { users } from '../../db/schema';
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { injectable } from "tsyringe";


export class DrizzleUserRepository implements UserRepository {

  constructor(){}

  async findByemailAndPassword(user: SingInDTO): Promise<AuthResponseDto | null> {
    try {
      // Rechercher l'utilisateur par email seulement
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);

      if (existingUser.length === 0) {
        return null;
      }

      const foundUser = existingUser[0];

      // Retourner les données utilisateur (le use case s'occupera de la vérification du mot de passe)
      return {
        id: foundUser.id,
        passwordHash: foundUser.passwordHash,
        email: foundUser.email,
        userName: foundUser.username,
        token: '',
        createdAt: foundUser.createdAt
      };
    } catch (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      throw error;
    }
  }

  async registerUser(user: SignUpDTO): Promise<AuthResponseDto> {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1)

      if (existingUser.length > 0) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }

      // Le mot de passe sera hashé dans le use case avant d'arriver ici
      // Insérer le nouvel utilisateur
      const newUser = await db
        .insert(users)
        .values({
          username: user.username,
          email: user.email,
          passwordHash: user.password, // Le mot de passe est déjà hashé par le use case
          carbonFootprint: '0', // Valeur par défaut
        })
        .execute();

      if (!newUser) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }

      type UserSelect = typeof users.$inferSelect;

      const createdUser = db
        .select()
        .from(users)
        .where(eq(users.id, newUser[0].insertId))
        .limit(1)
        .execute() as unknown as UserSelect

        
      if (!createdUser) {
        throw new Error('Erreur lors de la récupération de l\'utilisateur créé');
      }

      const userData = createdUser;

      // Retourner les données utilisateur (le token sera généré dans le use case)
      return {
        id: userData.id,
        passwordHash: userData.passwordHash,
        email: userData.email,
        userName: userData.username,
        token: '', // Le token sera généré dans le use case
        createdAt: userData.createdAt
      };
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      throw error;
    }
  }
}