const dns = require('node:dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])


const app = require('./src/app')

let port = 3000

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})