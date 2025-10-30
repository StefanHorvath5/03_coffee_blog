export interface User {
  id: string;
  email: string;
  role: string;
}
export interface Item {
  id: string;
  title: string;
  // content stored as JSON from the server: { html: string }
  content?: { html: string };
}

export enum Roles {
  ADMIN = "admin",
  user = "user",
}
