import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  slug: string;

  @Column({ type: 'jsonb' })
  content?: ContentBlock[];

  @Column({ type: 'varchar', nullable: true })
  mainImageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  metaDescription: string;

  @Column({ type: 'text', nullable: true })
  sources: string;

  @Column({ type: 'text', nullable: true })
  hashtags: string;

  @Column({ type: 'boolean', default: false })
  hidden: boolean;

  @Column({ type: 'integer', default: 0 })
  numOfViews: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
