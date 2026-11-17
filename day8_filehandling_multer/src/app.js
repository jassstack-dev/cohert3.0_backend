const express = require('express')
const multerRoutes = require('./routes/multer.routes')

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hello bro here i practicing multer ')
})

app.use('/multer', multerRoutes)

module.exports = app 