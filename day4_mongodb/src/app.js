const express = require('express')
const db = require('./config/db')
const noteModel = require('./note.model')


const app = express()
app.use(express.json())
db()

app.get('/', (req,res)=>{
    res.send('hello bachhhhhoooo')
})

app.post('/create', async (req,res)=>{

    const {title, description} = req.body

    const notes =await noteModel.create({
        title,
        description 
    })

    return res.status(201).json({
        success: true,
        message: 'note created successfully',
        data: notes
    })
    
})

module.exports = app