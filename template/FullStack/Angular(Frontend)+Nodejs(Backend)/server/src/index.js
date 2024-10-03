require("dotenv").config()
const express=require("express")
const app=express()
const helmet = require('helmet')
const cors=require("cors")
const {connectDB}=require("./utils/DB_config")
const port=process.env.PORT 

const userRouter=require("./routes/user.route.js")

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}))
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user",userRouter);

app.use((error, req, res, next) => {
    console.error(error)
    res.status(response.statuscode).json("Internal Server Error")
});

connectDB()
.then(()=>{
    console.log("Database Connected!")
})
.catch((err)=>{
    console.error(err);
});

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
});