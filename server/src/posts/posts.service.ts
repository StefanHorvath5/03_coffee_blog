import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postsRepo: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const p = this.postsRepo.create(createPostDto);
    return this.postsRepo.save(p);
  }

  findAll(includeHidden = false) {
    if (includeHidden) return this.postsRepo.find();
    return this.postsRepo.find({ where: { hidden: false } });
  }

  async findOneBySlug(
    slug: string,
    increment = false,
    requesterIsAdmin = false,
  ) {
    const post = await this.postsRepo.findOneBy({ slug });
    if (!post || post.hidden) return null;
    if (increment && !requesterIsAdmin) {
      post.numOfViews = (post.numOfViews || 0) + 1;
      await this.postsRepo.save(post);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.postsRepo.update(id, updatePostDto);
    return this.postsRepo.findOneBy({ id });
  }

  remove(id: string) {
    return this.postsRepo.delete(id);
  }
}
