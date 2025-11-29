import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ContentBlock } from '../entities/post.entity';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty if provided.' })
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Slug must not be empty if provided.' })
  slug: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ message: 'Content must not be empty if provided.' })
  content: ContentBlock[];

  mainImageUrl: string;
  metaDescription: string;
  sources: string;
  hashtags: string;
  hidden?: boolean;
}
