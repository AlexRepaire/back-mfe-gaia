import { Router } from "express";
import { BadRequestException, ConflictException } from "~/utils/exceptions";
import { UsersService } from "../users/users.service";
import bcrypt from "bcrypt";
import { generateAccessToken } from "~/utils/jwt";

const AuthController = Router();

const userService = new UsersService();

/**
 * @route GET api/auth
 * @description connection
 * @access Public
 */
AuthController.get("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestException("You must provide a email and a password.");
    }

    const existingUser = await userService.findUserByEmail(email);

    if (!existingUser) {
      throw new BadRequestException("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      throw new BadRequestException("Invalid login credentials.");
    }

    const accessToken = generateAccessToken(existingUser);

    res.json({
      accessToken,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route POST api/auth
 * @description inscription
 * @access Public
 */
AuthController.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestException(
        "You must provide an email and a password."
      );
    }

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException("Email already in use.");
    }

    const user = userService.createUserByEmailAndPassword(email, password);

    const accessToken = generateAccessToken(user);

    res.json({
      accessToken,
    });
  } catch (err) {
    next(err);
  }
});

export { AuthController };
