import express from 'express'
import cookieParser from "cookie-parser";
import connectToDb from './config/db.js';
import router from './routes/auth.routes.js';
import productsRouter from './routes/products.routes.js';


await connectToDb()
const app = express()
app.use(express.json())
app.use(cookieParser())


// auth routes
app.use('/api/auth', router)
app.use('/api/products', productsRouter)


export default app;