const express = require('express')
const db = require('./config/db')
const noteRouter = require('./routes/note.routes')
const cors = require('cors')


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials:true
}))
app.use(express.json())
db()

app.get('/', (req,res)=>{
    res.send('hello bachhhhhoooo')
})

app.use('/notes', noteRouter)

module.exports = app 