import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ContentBlock } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty.' })
  title: string;
  @IsArray()
  @IsNotEmpty({ message: 'Content must not be empty.' })
  content: ContentBlock[];
}
