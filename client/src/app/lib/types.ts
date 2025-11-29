export interface User {
  id: string;
  email: string;
  role: string;
}
export type ContentData = {
  text?: string;
  url?: string;
  caption?: string;
  author?: string;
};

export type ContentBlock = {
  type: string;
  data: ContentData;
};

export interface Post {
  id: string;
  title: string;
  slug?: string;
  content?: ContentBlock[];
  mainImageUrl: string;
  metaDescription: string;
  sources: string;
  hashtags: string;
  hidden?: boolean;
  numOfViews?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum Roles {
  ADMIN = "admin",
  user = "user",
}

export const ALLOWED_TAGS = new Set([
  "p",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "img",
  "span",
  "table",
  "th",
  "td",
  "b",
  "hr",
]);

export const ALLOWED_ATTRS = new Set([
  "alt",
  "src",
  "class",
  "id",
  "className",
  "placeholder",
  "title",
  "width",
  "height",
  "style",
]);
