import mongoose from "mongoose";
import config from "./config.js";


const connectToDB =async ()=>{

    try {

        const db = await mongoose.connect(config.MONGO_URI)
        console.log('db connected', db.connection.host)
        
    } catch (error) {
        console.log('error in connect to DB', error)
    }

}

export default connectToDB