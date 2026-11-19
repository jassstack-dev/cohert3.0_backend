import express from 'express'
import routes from './routes/auth.routes.js'


const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('server running smoothly')
})

app.use('/auth', routes)

export default app;