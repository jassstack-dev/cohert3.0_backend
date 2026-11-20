import app from "./src/app.js";
import config  from "./src/config/config.js";
import connectToDb from "./src/config/db.js";


await connectToDb()



app.listen(config().port, ()=>{
    console.log('server running on the port', )
})
