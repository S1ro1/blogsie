import {
  type DefaultSession,
  type DefaultUser,
} from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      image: string;
      firstName: string;
      lastName: string;
    };
  }
  interface User extends DefaultUser {
    id: string;
    image: string;
    firstName: string;
    lastName: string;
  }
}
