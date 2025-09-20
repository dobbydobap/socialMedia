import express from 'express'
import dotenv from 'dotenv'


dotenv.config()
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'

//we need to create our server now 
const app = express()
const PORT = 8000
app.use(express.json())

//authentication routes
app.use('/api/auth',authRouter)


connectDB() 

app.get('/', ( req,res) =>{
    res.send('Hello from social server!')
})

app.listen(PORT,()=>{
    console.log(`Social server is running on port ${PORT}`);
})

//config .env file