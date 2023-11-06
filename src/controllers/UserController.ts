import { Request, Response } from "express";
import { prisma } from "../db";

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExists) {
        return res
          .status(404)
          .json({ error: true, message: "E-mail já cadastrado!" });
      }

      const user = await prisma.user.create({ data: { name, email } });

      return res
        .status(201)
        .json({
          error: false,
          message: "Usuario cadastrado com sucesso!",
          user,
        });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
