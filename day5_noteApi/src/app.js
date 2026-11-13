const express = require('express')
const db = require('./config/db')
const noteRouter = require('./routes/note.routes')


const app = express()
app.use(express.json())
db()

app.get('/', (req,res)=>{
    res.send('hello bachhhhhoooo')
})

app.use('/notes', noteRouter)

module.exports = app 