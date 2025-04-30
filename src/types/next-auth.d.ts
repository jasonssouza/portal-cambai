import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      nome: string;
      email: string;
    };
  }

  interface User {
    id: number;
    nome: string;
    email: string;
    password?: string;
  }
}
