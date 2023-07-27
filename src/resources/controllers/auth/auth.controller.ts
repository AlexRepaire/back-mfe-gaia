import { NextFunction, Request, Response, Router } from "express";
import { BadRequestException, ConflictException } from "~/utils/exceptions";
import bcrypt from "bcrypt";
import { generateAccessToken } from "~/utils/jwt";
import UsersService from "~/resources/services/users";
import {
  userDataLoginValidateSchemaBased,
  userDataRegisterValidateSchemaBased,
  userDataResetPasswordValidateSchemaBased,
} from "~/resources/validations/user.validation";
import validationResultHandler from "~/resources/validations/validationResult";

const AuthController = Router();

const userService = new UsersService();

/**
 * @route POST api/auth
 * @description connection
 * @access Public
 */
AuthController.post(
  "/login",
  userDataLoginValidateSchemaBased,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResultHandler(req);
      const { email, password } = req.body;

      const existingUser = await userService.findUserByEmail(email);

      if (!existingUser) {
        throw new BadRequestException("User don't exist");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        throw new BadRequestException("Password invalid.");
      }

      const accessToken = generateAccessToken(existingUser);

      res.json({
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @route POST api/auth
 * @description inscription
 * @access Public
 */
AuthController.post(
  "/register",
  userDataRegisterValidateSchemaBased,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResultHandler(req);
      const { email, password } = req.body;

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
  }
);

/**
 * @route POST api/auth
 * @description send password reset link
 * @access Public
 */
AuthController.post(
  "/password-reset",
  userDataResetPasswordValidateSchemaBased,
  async (req: Request, res: Response) => {
    try {
      validationResultHandler(req);

      const user = await userService.findUserByEmail(req.body.email);

      if (!user)
        throw new BadRequestException("user with given email doesn't exist");

      // let token = await Token.findOne({ userId: user.id });
      // if (!token) {
      //     token = await new Token({
      //         userId: user._id,
      //         token: crypto.randomBytes(32).toString("hex"),
      //     }).save();
      // }

      // const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
      // await sendEmail(user.email, "Password reset", link);

      res.send("password reset link sent to your email account");
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  }
);

/**
 * @route POST api/auth
 * @description reset user password
 * @access Public
 */
AuthController.post("/password-reset/:userId/:token", async (req, res) => {});

export { AuthController };
