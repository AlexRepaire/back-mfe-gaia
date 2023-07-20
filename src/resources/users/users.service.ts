//import { User } from "~/types/user";
import { PrismaClient, Users } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { User } from "~/types/user";
import { NotFoundException } from "~/utils/exceptions";
import bcrypt from "bcrypt";
import { db } from "~/utils/db";

const prisma = new PrismaClient();

export class UsersService {
  /**
   * Chercher tous les utilisateurs
   */
  async findAll(): Promise<any> {
    return await prisma.users
      .findMany()
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        throw new NotFoundException(error);
      })
      .finally(async () => await prisma.$disconnect());
  }

  /**
   * Chercher un utilisateur avec un ID
   * @param id - une variable correspondant à l'id de l'utilisateur qu'on veut récuperer.
   */
  async findUserById(id: string): Promise<any> {
    return await prisma.users
      .findUnique({
        where: {
          id,
        },
      })
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        throw new NotFoundException(error);
      })
      .finally(async () => await prisma.$disconnect());
  }

  /**
   * Chercher un utilisateur par email
   * @param id - une variable correspondant à l'email de l'utilisateur qu'on veut récuperer.
   */
  async findUserByEmail(email: string): Promise<any> {
    return await prisma.users
      .findUnique({
        where: {
          email,
        },
      })
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => {
        throw new NotFoundException(error);
      })
      .finally(async () => await prisma.$disconnect());
  }

  /**
   * Créé un utilisateur avec un email et un mot de passe
   * @param userData - Un objet correspondant à un utilisateur.
   */
  async createUserByEmailAndPassword(userData: Users): Promise<any> {
    userData.password = bcrypt.hashSync(userData.password, 12);
    return await db.users.create({
      data: userData,
    });
  }

  /**
   * Suppression d'un utilisateur
   * @param id - une variable correspondant à l'id de l'utilisateur qu'on veut supprimer.
   */
  delete(id: number) {}
}
