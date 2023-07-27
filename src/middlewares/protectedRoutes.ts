import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestException, UnauthorizedException } from "~/utils/exceptions";

const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new UnauthorizedException("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    req.payload = payload;
    return next();
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new BadRequestException(err.name);
    }
    throw new UnauthorizedException("🚫 Un-Authorized 🚫");
  }

  return next();
};

export { isAuthenticated };
