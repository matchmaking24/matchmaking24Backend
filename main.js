const express  = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path:'config/config.env'})
const connectDB = require('./db/connection')
const userRoute = require('./router/userRoute')


const app = express()
app.use(express.json())

app.use(cors({
    origin:['http://localhost:3000','https://matchmaking24.netlify.app','https://matchmaking24.com'],
    methods: ['GET', 'PUT', 'POST','DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
    credentials: true, 
    maxAge: 600, 
    exposedHeaders: ['*', 'Authorization' ] 
})) 

app.use('/user',userRoute);

connectDB()
app.listen(process.env.PORT,()=>{
    console.log("server is runnig at :",process.env.PORT)
})