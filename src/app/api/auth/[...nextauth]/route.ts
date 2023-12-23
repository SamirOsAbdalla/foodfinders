import NextAuth from "next-auth"
import { Account, User as AuthUser } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/User";
import connectDB from "@/util/db";
import bcrypt from "bcrypt"

const authOptions: any = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connectDB()

                try {
                    const user = await UserModel.findOne({ email: credentials.email })
                    if (user) {

                        if (!user.password) {
                            throw new Error("Incorrect password")
                        }

                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )

                        if (isPasswordCorrect) {
                            return user;
                        }

                        throw new Error("Incorrect password")
                    }

                    throw new Error("User does not exist")

                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message)
                    }
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser, account: Account }) {
            if (account.provider == "credentials") {
                return true;
            }
            if (account.provider == "google") {
                await connectDB()
                try {
                    const existingUser = await UserModel.findOne({ email: user.email })
                    if (!existingUser) {
                        await UserModel.create({ email: user.email })
                    }
                    return true

                } catch (error) {
                    return false
                }
            }
        }
    },
    pages: {
        signIn: "/signIn",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }