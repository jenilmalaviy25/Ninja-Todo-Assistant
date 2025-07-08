import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
import indexRouter from './rotues/index.route.js'
import { handleError } from './utills/apierror.js'
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 2003
const app = express()

await connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api',indexRouter)
app.use(handleError)

app.listen(port,()=>{
    console.log(`App listen on ${port}`)
})