import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";

import User from "@models/User";

console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ], 
    async session({session}) {
        const sessionUser = await User.findOne({email: session.user.email});

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({profile}) {
        try {
            // serverless -> Lambda -> dynamodb
            await connectToDB();

            // check if user exists in db
            const userExists = await User.findOne({email: profile.email});

            // if not, create user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", ""),
                    image: profile.picture,
                });
            }

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
})

export {handler as GET, handler as POST};
