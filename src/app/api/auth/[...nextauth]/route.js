import prisma from "@/lib/prisma";
import { findUser } from "@/lib/utils/user";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const OPTIONS = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Your Email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("Email is not correct");

        // if (user.password !== credentials.password)
        //   throw new Error("Email Or Password is Not Correct");

        const isPasswordOk = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordOk) throw new Error("Password is Not Correct");

        const { password, ...userWithOutPassowrd } = user;

        return userWithOutPassowrd;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user);
      return token;
    },
    async session({ token, session, user }) {
      // console.log(user);
      return session;
    },
    async signIn(user, account, profle) {
      findUser(user);
      return true;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
