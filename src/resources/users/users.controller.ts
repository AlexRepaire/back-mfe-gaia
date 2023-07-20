import { Router } from "express";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "~/utils/exceptions";
import { isAuthenticated } from "../../middlewares/protectedRoutes";

const UsersController = Router();

const service = new UsersService();

/**
 * @route GET api/users
 * @description Trouve tous les utilisateurs
 * @access Private
 */
UsersController.get("/", isAuthenticated, async (req, res) => {
  return res.status(200).json(JSON.parse(await service.findAll()));
});

/**
 * @route GET api/users
 * @description Trouve un utilisateur par son ID
 * @access Private
 */
UsersController.get("/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;

  if (!Number.isInteger(id)) {
    throw new BadRequestException("ID non valide");
  }

  const user = await service.findUserById(id);

  if (!user) {
    throw new NotFoundException("Utilisateur introuvable");
  }

  return res.status(200).json(user);
});

/**
 * @route POST api/users
 * @description Créer un utilisateur
 * @access Private
 */
UsersController.post("/", isAuthenticated, async (req, res) => {});

/**
 * @route UPDATE api/users
 * @description Modifier un utilisateur
 * @access Private
 */
UsersController.patch("/:id", isAuthenticated, async (req, res) => {});

/**
 * @route DELETE api/users
 * @description Supprimer un utilisateur
 * @access Private
 */
UsersController.delete("/:id", isAuthenticated, (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new BadRequestException("ID invalid");
  }

  return res.status(200).json(service.delete(id));
});

export { UsersController };
