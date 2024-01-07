import NextAuth, {User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/lib/actions";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = await login(credentials.email as string, credentials.password as string);
        if (user) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          }
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    "signIn": "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    }
  }
})
