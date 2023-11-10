import { Post } from "@prisma/client";
import { IPostRepository } from "../interfaces/IPostRepository";
import { prisma } from "../db";

class PostRepository implements IPostRepository {
  public async create(
    title: string,
    content: string,
    authorId: number
  ): Promise<Post> {
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });

    return post;
  }
}

export { PostRepository };
