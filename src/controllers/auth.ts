import type { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { prismaClient } from "..";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsErrors } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";

const login = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prismaClient.user.findFirst({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!compareSync(password, user.password)) {
      next(new BadRequestsErrors("Incorrect password", ErrorCodes.INCORRECT_PASSWORD));
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      next(new BadRequestsErrors("User already exists", ErrorCodes.USER_ALREADY_EXISTS))
    }

    user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashSync(password, 10),
      },
    });

    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { login, register };
