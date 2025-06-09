import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import config from '../../core/config';
import mysql from "mysql2/promise";           // <-- client natif mysql2 (API Promise)


const { DB_URL } = process.env;
if (!DB_URL) {
  throw new Error("Variable d'environnement DB_URL manquante");
}

/** 1. On crée un *pool* de connexions à partir de l'URI */
export const pool = mysql.createPool(DB_URL); // DB_URL = "mysql://user:pass@host/db"

/** 2. On donne ce pool à Drizzle */
export const db = drizzle(pool);              // <- plus de TypeError