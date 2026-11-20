import mongoose from "mongoose";
import config from "./config.js";


const connectToDb = async ()=>{
try {
    await mongoose.connect(config().mongo_uri)
    console.log('db connected successfully')
} catch (error) {
    console.log('error in connect to db')
    
}
}

export default connectToDb