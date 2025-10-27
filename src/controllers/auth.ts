import type { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  try {
    res.json({ success: true, message: "Login works" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { login };
