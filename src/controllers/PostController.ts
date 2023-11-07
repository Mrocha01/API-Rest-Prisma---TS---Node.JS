import { Request, Response } from "express";
import { prisma } from "../db";

export default {
  async createPost(req: Request, res: Response) {
    try {
      const { title, content, authorId } = req.body;

      if (!title || !authorId || !content) {
        return res.status(400).json({
          error: true,
          message: "Os campos title, authorId e content são obrigatórios!",
        });
      }

      const userId = parseInt(authorId);

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "Usuario não encontrado!" });
      }

      const currentTime = new Date();

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: userId,
          published: currentTime,
        },
      });

      return res.status(201).json({
        error: false,
        message: "Post criado com sucesso!",
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
