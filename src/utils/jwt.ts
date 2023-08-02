import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "@prisma/client";

dotenv.config();

const generateAccessToken = (user: Users) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "5h",
  });
};

const hashTokenPasswordReset = (email: string) => {
  return jwt.sign({ userEmail: email }, process.env.JWT_RESET_PASSWORD!, {
    expiresIn: "10m",
  });
};

export { generateAccessToken, hashTokenPasswordReset };
