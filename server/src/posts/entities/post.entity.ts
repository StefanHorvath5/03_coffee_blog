import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface ContentData {
  text?: string;
  url?: string;
  caption?: string;
  class?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  style?: string;
  className?: string;
  id?: string;
}

export interface ContentBlock {
  type: string;
  data: ContentData;
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'jsonb' })
  content?: ContentBlock[];
}
