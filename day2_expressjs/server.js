// const http = require('http')
// const server = http.createServer((req, res)=>{
   
//     if(req.url === '/users'){
//         res.end('hello mai user hu')
//     }
//     if(req.url === '/home'){
//         res.end('hello mai home hu')
//     }
    
// })

const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hello u got me')
})

app.post('/create', (req,res)=>{
    console.log(req.body)
    res.send('ok post')
})



app.listen(3000, ()=>{
    console.log('server runnning on port 3000')  
})