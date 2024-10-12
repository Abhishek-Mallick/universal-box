import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import path from 'path'
import connectdb from './configs/connectdb.js'
import jwtAuth from './middlewares/jwtAuth.js';
import cookieParser from 'cookie-parser';
import adminAuth from './middlewares/adminAuthrization.js';


dotenv.config();

connectdb(process.env.DB_URL);

const app=express();  

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/user', userRoutes)

app.get('/home', (req,res)=>{
    let action='login';
    if(req.cookies.token) action='logout'
    res.render('home', {action})
})

app.get('/admin', jwtAuth.jwtAuthCookie, adminAuth, (req,res)=>{
    res.render('admin')
})

app.listen(process.env.PORT, console.log(`running on port ${process.env.PORT}`))