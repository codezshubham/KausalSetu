import mongoose from 'mongoose';

// Check if a connection is already cached to prevent redundant connections.
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database.
 * @returns {Promise<typeof mongoose>} The Mongoose instance.
 */
export async function connectDB() {
    // If a connection is already established, return the cached connection.
    if (cached.conn) {
        console.log('Using existing MongoDB connection.');
        return cached.conn;
    }

    // If there's no promise in the cache, create a new one to connect.
    if (!cached.promise) {
        // Ensure the MongoDB URI is available in your environment variables.
        const opts = {
            bufferCommands: false,
        };
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
        }

        // Connect to MongoDB and store the promise.
        cached.promise = mongoose.connect(mongoUri, opts)
            .then(mongoose => {
                console.log('🎉 MongoDB connected successfully!');
                return mongoose;
            })
            .catch(error => {
                console.error('❌ MongoDB connection failed:', error);
                throw error; // Rethrow the error to be caught by the caller
            });
    }

    // Wait for the connection promise to resolve and cache the connection.
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // Clear the promise on error
        throw error;
    }

    return cached.conn;
}
