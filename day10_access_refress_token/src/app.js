import express from "express";
import routes from "./routes/auth.routes.js";
import cookie from 'cookie-parser'

const app = express();
app.use(express.json());
app.use(cookie())


app.use('/api/auth', routes)



export default app
