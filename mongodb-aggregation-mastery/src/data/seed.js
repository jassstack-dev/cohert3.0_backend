import mongoose from "mongoose";
import orders from "./order.js";


const seedOrders = async ()=>{
    try {

     
        await mongoose.connection
        .collection('orders')
        .deleteMany({})

        await mongoose.connection
        .collection('orders')
        .insertMany(orders)


        console.log('orders inserted successfully')
        
    } catch (error) {
        console.log('error in the seeds file')
        
    }
}

export default seedOrders