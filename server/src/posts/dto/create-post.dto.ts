import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ContentBlock } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug must not be empty.' })
  slug: string;

  @IsArray()
  @IsNotEmpty({ message: 'Content must not be empty.' })
  content: ContentBlock[];

  mainImageUrl: string;
  metaDescription: string;
  sources: string;
  hashtags: string;
}
