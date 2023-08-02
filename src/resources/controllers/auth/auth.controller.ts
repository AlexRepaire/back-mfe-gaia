import { NextFunction, Request, Response, Router } from "express";
import { BadRequestException, ConflictException } from "~/utils/exceptions";
import bcrypt from "bcrypt";
import { generateAccessToken, hashTokenPasswordReset } from "~/utils/jwt";
import UsersService from "~/resources/services/users";
import {
  userDataLoginValidateSchemaBased,
  userDataRegisterValidateSchemaBased,
  userDataResetPasswordValidateSchemaBased,
} from "~/resources/validations/user.validation";
import validationResultHandler from "~/resources/validations/validationResult";
import sendEmail from "~/utils/sendEmail";

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
      const { email, password, name } = req.body;

      const existingUser = await userService.findUserByEmail(email);

      if (existingUser) {
        throw new ConflictException("Email already in use.");
      }

      const user = await userService.createUserByEmailAndPassword(
        email,
        password,
        name
      );

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
      const { email } = req.body;

      const user = await userService.findUserByEmail(email);

      if (!user) {
        throw new BadRequestException("user with given email doesn't exist");
      }

      let token = hashTokenPasswordReset(email);
      const link = `${process.env.BASE_URL_DEV}/auth/password-reset/${user.id}/${token}`;
      await sendEmail(user.email, "Password reset", link);

      res.status(200).json({
        message: "password reset link sent to your email account",
        status: 200,
      });
    } catch (error) {
      throw new BadRequestException("An error occured");
    }
  }
);

/**
 * @route POST api/auth
 * @description reset user password
 * @access Public
 */
AuthController.post("/password-reset/:userId/:token", async (req, res) => {
  // try {
  //   const { userId, token } = req.params;
  //   const { password } = req.body;
  //   const user = await userService.findUserById(userId);
  //   if (!user) throw new BadRequestException("user with given id doesn't exist");
  //   const decodedToken = jwt.verify(token, process.env.JWT_RESET_PASSWORD!);
  //   if (decodedToken.userEmail !== user.email)
  //     throw new BadRequestException("invalid token");
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   await userService.updateUserPassword(user.id, hashedPassword);
  //   res.status(200).json({
  //     message: "password updated successfully",
  //     status: 200,
  //   });
  // } catch (error) {
  //   throw new BadRequestException("An error occured");
  // }
});

export { AuthController };
