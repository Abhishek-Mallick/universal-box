const mongoose=require("mongoose")

const connectDB= async ()=>{
    try{
        const db_url=process.env.MONGODB_URI;
        mongoose.connect(db_url);
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports={connectDB};