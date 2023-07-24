"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = require("express");
const users_service_1 = require("./users.service");
const exceptions_1 = require("../utils/exceptions");
const protectedRoutes_1 = require("../../middlewares/protectedRoutes");
const UsersController = (0, express_1.Router)();
exports.UsersController = UsersController;
const service = new users_service_1.UsersService();
/**
 * @route GET api/users
 * @description Trouve tous les utilisateurs
 * @access Private
 */
UsersController.get("/", protectedRoutes_1.isAuthenticated, async (req, res) => {
    return res.status(200).json(JSON.parse(await service.findAll()));
});
/**
 * @route GET api/users
 * @description Trouve un utilisateur par son ID
 * @access Private
 */
UsersController.get("/:id", protectedRoutes_1.isAuthenticated, async (req, res) => {
    const id = req.params.id;
    if (!Number.isInteger(id)) {
        throw new exceptions_1.BadRequestException("ID non valide");
    }
    const user = await service.findUserById(id);
    if (!user) {
        throw new exceptions_1.NotFoundException("Utilisateur introuvable");
    }
    return res.status(200).json(user);
});
/**
 * @route POST api/users
 * @description Créer un utilisateur
 * @access Private
 */
UsersController.post("/", protectedRoutes_1.isAuthenticated, async (req, res) => { });
/**
 * @route UPDATE api/users
 * @description Modifier un utilisateur
 * @access Private
 */
UsersController.patch("/:id", protectedRoutes_1.isAuthenticated, async (req, res) => { });
/**
 * @route DELETE api/users
 * @description Supprimer un utilisateur
 * @access Private
 */
UsersController.delete("/:id", protectedRoutes_1.isAuthenticated, (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        throw new exceptions_1.BadRequestException("ID invalid");
    }
    return res.status(200).json(service.delete(id));
});
