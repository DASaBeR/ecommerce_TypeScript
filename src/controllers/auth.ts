import type { Request, Response } from "express";
import { hashSync } from "bcrypt";
import { prismaClient } from "..";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prismaClient.user.findFirst({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
        success: true,
        user,
      })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
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
