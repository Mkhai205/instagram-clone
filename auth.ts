import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";

export const config = {
    pages: {
        signIn: "/login",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.username = token.username;
            }

            return session;
        },
        async jwt({ token, user }) {
            const prismaUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (!prismaUser) {
                token.id = user.id;
                return token;
            }

            if (!prismaUser.username) {
                await prisma.user.update({
                    where: {
                        id: prismaUser.id,
                    },
                    data: {
                        username: prismaUser.name
                            ?.split(" ")
                            .join("")
                            .toLowerCase(),
                    },
                });
            }

            return {
                id: prismaUser.id,
                name: prismaUser.name,
                email: prismaUser.email,
                picture: prismaUser.image,
                username: prismaUser.username,
            };
        },
    },
} satisfies NextAuthOptions;

export default NextAuth(config);

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, config);
}
