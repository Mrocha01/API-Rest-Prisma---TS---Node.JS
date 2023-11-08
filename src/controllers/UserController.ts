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
          .status(406)
          .json({ error: true, message: "E-mail já cadastrado!" });
      }

      const user = await prisma.user.create({ data: { name, email } });

      return res.status(201).json({
        error: false,
        message: "Usuario cadastrado com sucesso!",
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (isNaN(Number(id))) {
        return res.status(400).json({
          error: true,
          message: "ID inválido. Forneça apenas números!.",
        });
      }

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "Usuario não encontrado!" });
      }

      return res.status(200).json({
        error: false,
        message: "Usuario encontrado com sucesso!",
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  async getUserByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;

      const user = await prisma.user.findUnique({ where: { email: email } });

      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "Usuario não encontrado!" });
      }

      return res.status(200).json({
        error: false,
        message: "Usuario encontrado com sucesso!",
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
