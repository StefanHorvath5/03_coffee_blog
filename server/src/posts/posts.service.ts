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

  findAll() {
    return this.postsRepo.find();
  }

  findOne(id: string) {
    return this.postsRepo.findOneBy({ id });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.postsRepo.update(id, updatePostDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.postsRepo.delete(id);
  }
}
