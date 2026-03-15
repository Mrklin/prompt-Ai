import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async session({session}){

            try {
                await connectToDB();
                
                //To keep an existing session of a user
                const sessionUser = await User.findOne({
                    email: session.user.email
                })

                if(sessionUser){
                    session.user.id = sessionUser._id.toString();
                }
            } catch (error) {
                console.log("Session Error: Could not connect to database -", error.message);
            }
            // To know who is online
            return session
        },

        async signIn({ profile }) {
    
        try {
            await connectToDB();

            // LOG THIS: See if email or name is missing
            console.log("Google Profile:", profile);

            // Check if user exists
            const userExist = await User.findOne({ email: profile.email });

            if (!userExist) {
            // Remove spaces, lowercase it
            let generatedUsername = profile.name.replace(/\s/g, "").toLowerCase();

            // Safety check: if the name is only 1 character (e.g., "F"), 
            // append the first part of their email to satisfy the 2-character regex
            if (generatedUsername.length < 2) {
                generatedUsername = profile.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, "");
            }

            await User.create({
                email: profile.email,
                username: generatedUsername,
                image: profile.picture
            });
            console.log("New user created:", generatedUsername);
        }

            return true;
        } catch (error) {
            console.log("--- AUTH ERROR START ---");
            console.log("Sign in error:", error.message); 
            console.log("Error code:", error.code);
            console.log("--- AUTH ERROR END ---");
            
            // Return false to show AccessDenied error
            return false;
        }
    }

    }
 
})

export {handler as GET, handler as POST}