

import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { API } from "./Api";
import { prisma } from "./prisma";



export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const res = prisma.user.findUnique({
            where:{
                email: credentials.email
            }
        })

        if(!res) {
            console.log("User not found");
            return null;
        }

        const user = users.find(
          (user) => user.email === credentials.email
        );

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = Number(token.id)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id, 
          name: token.name,
          email: token.email,
        },
      };
    },
  },
};