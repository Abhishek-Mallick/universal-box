import mongoose from "mongoose";

async function connectdb(dbUrl){
    try {
       await mongoose.connect(dbUrl);
        logger.info(`Connected to MongoDB at ${mongoose.connection.host}`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        throw error; // Re-throw to allow handling by the caller
    }
}


export default connectdb;
