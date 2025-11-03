import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text"
                },

                password: {
                    label: "Password",
                    type: "password"
                }
            },

            async authorize(credentials) {
                await connectDB()
                const user = await User.findOne({ email: credentials.email })

                if (!user) {
                    throw new Error("User not found!")
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordCorrect) {
                    throw new Error("Wrong Password!")
                }

                return {
                    id: user._id,
                    email: user.email
                }
            }
        })
    ],

    // Add the callbacks here
    callbacks: {
        async jwt({ token, user }) {
            // When signing in, add user data to token
            if (user) {
                token.role = user.role;
                token.id = user.id;
                // Add any other user properties you need
            }
            return token;
        },

        async session({ session, token }) {
            // Make role available on the client
            if (token) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },

    pages: {
        signIn: "/login",
        error: "/login"
    },

    secret: process.env.NEXTAUTH_SECRET
}