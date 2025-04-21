import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@lib/auth";
import { prisma } from "@/lib/prisma"; // Make sure this file exists
import speakeasy from "speakeasy";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";


export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "2FA Code", type: "text", optional: true },
      },
      async authorize(credentials) {
        const { email, password, otp } = credentials as {
          email: string;
          password: string;
          otp?: string;
        };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        const valid = await comparePassword(password, user.password);
        if (!valid) throw new Error("Invalid password");

        if (user.twoFactorEnabled) {
          if (!otp) throw new Error("2FA code required");

          const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret!,
            encoding: "base32",
            token: otp,
          });

          if (!verified) throw new Error("Invalid 2FA code");
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
        if (user) token.user = user;
        return token;
      },
      async session({ session, token }: { session: Session; token: JWT }) {
        if (token?.user) session.user = token.user as any;
        return session;
      },
  },
  pages: {
    signIn: "/signin", // optional, customize your signin UI
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
