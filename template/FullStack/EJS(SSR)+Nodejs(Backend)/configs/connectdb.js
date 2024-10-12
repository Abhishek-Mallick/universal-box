import mongoose from "mongoose";

async function connectdb(dbUrl){
    await mongoose.connect(dbUrl)
    console.log("connected with: ", mongoose.connection.host)
}

export default connectdb;