import mongoose from "mongoose";

let isConnected = false //to track connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    if (!process.env.MONGODB_URI) {
        console.log('MongoDB URI is not defined in environment variables');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            serverSelectionTimeoutMS: 7000, // Timeout after 7s
            socketTimeoutMS: 45000,
        });
        
        isConnected = true;
        console.log('MongoDB Connected Successfully');
        console.log('Database Host:', db.connection.host);
        
    } catch (error) {
        console.log("MongoDB Connection Error: ", error.message);
        console.log("Error Code:", error.code);
        console.log("Error Name:", error.name);
        
        // Provide more specific error guidance
        if (error.message.includes('bad auth')) {
            console.log('>>> AUTHENTICATION FAILED - Check your MongoDB username/password in .env');
            console.log('>>> Make sure your MongoDB Atlas password is URL-encoded if it contains special characters');
        }
        if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.log('>>> CLUSTER NOT FOUND - Check your cluster name in MONGODB_URI');
        }
    }
}
