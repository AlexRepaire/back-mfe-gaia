import { NextFunction, Request, Response, Router } from "express";
import { BadRequestException, NotFoundException } from "~/utils/exceptions";
import { isAuthenticated } from "../../../middlewares/protectedRoutes";
import UsersService from "~/resources/services/users";

const UsersController = Router();

const service = new UsersService();

/**
 * @route GET api/users
 * @description Trouve tous les utilisateurs
 * @access Private
 */
UsersController.get(
  "/",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const query = req.query;

    return res.status(200).json(await service.findAll(query));
  }
);

/**
 * @route GET api/users
 * @description Trouve un utilisateur par son ID
 * @access Private
 */
UsersController.get(
  "/:id",
  [isAuthenticated],
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await service.findUserById(id);

    if (!user) {
      throw new NotFoundException("Utilisateur introuvable");
    }

    return res.status(200).json(user);
  }
);

/**
 * @route UPDATE api/users
 * @description Modifier un utilisateur
 * @access Private
 */
UsersController.patch(
  "/:id",
  isAuthenticated,
  async (req: Request, res: Response) => {}
);

/**
 * @route DELETE api/users
 * @description Supprimer un utilisateur
 * @access Private
 */
UsersController.delete(
  "/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      throw new BadRequestException("ID invalid");
    }

    return res.status(200).json(service.delete(id));
  }
);

export { UsersController };
