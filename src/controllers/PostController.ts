import { Request, Response } from "express";
import { prisma } from "../db";
import { format } from "date-fns";

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

      if (isNaN(Number(authorId))) {
        return res.status(400).json({
          error: true,
          message: "ID inválido. Forneça apenas números!.",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(req.body.authorId) },
      });

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
          authorId,
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

  async allPosts(req: Request, res: Response) {
    try {
      const data = await prisma.post.findMany();

      if (!data) {
        return res
          .status(404)
          .json({ error: true, message: "Posts não encontrados!" });
      }

      const formattedData = data.map((post) => {
        return {
          ...post,
          published: format(post.published, "dd/MM/yyyy HH:mm:ss"),
        };
      });

      return res.status(201).json({
        error: false,
        message: "Posts encontrados com sucesso!",
        formattedData,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  async removePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (isNaN(Number(id))) {
        return res.status(400).json({
          error: true,
          message: "ID inválido. Forneça apenas números!.",
        });
      }

      const post = await prisma.post.delete({ where: { id: Number(id) } });

      if (!post) {
        return res
          .status(404)
          .json({ error: true, message: "Post não encontrado!" });
      }

      return res.status(201).json({
        error: false,
        message: "Posts removido com sucesso!",
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
