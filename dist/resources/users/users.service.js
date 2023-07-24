"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
//import { User } from "~/types/user";
const client_1 = require("@prisma/client");
const exceptions_1 = require("../utils/exceptions");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../utils/db");
const prisma = new client_1.PrismaClient();
class UsersService {
    /**
     * Chercher tous les utilisateurs
     */
    async findAll() {
        return await prisma.users
            .findMany()
            .then((data) => {
                return JSON.stringify(data);
            })
            .catch((error) => {
                throw new exceptions_1.NotFoundException(error);
            })
            .finally(async () => await prisma.$disconnect());
    }
    /**
     * Chercher un utilisateur avec un ID
     * @param id - une variable correspondant à l'id de l'utilisateur qu'on veut récuperer.
     */
    async findUserById(id) {
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
                throw new exceptions_1.NotFoundException(error);
            })
            .finally(async () => await prisma.$disconnect());
    }
    /**
     * Chercher un utilisateur par email
     * @param id - une variable correspondant à l'email de l'utilisateur qu'on veut récuperer.
     */
    async findUserByEmail(email) {
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
                throw new exceptions_1.NotFoundException(error);
            })
            .finally(async () => await prisma.$disconnect());
    }
    /**
     * Créé un utilisateur avec un email et un mot de passe
     * @param userData - Un objet correspondant à un utilisateur.
     */
    async createUserByEmailAndPassword(userData) {
        userData.password = bcrypt_1.default.hashSync(userData.password, 12);
        return await db_1.db.users.create({
            data: userData,
        });
    }
    /**
     * Suppression d'un utilisateur
     * @param id - une variable correspondant à l'id de l'utilisateur qu'on veut supprimer.
     */
    delete(id) { }
}
exports.UsersService = UsersService;
