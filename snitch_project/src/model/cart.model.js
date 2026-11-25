import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products',
                required:true
            },
             size: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
})

const cartModel = mongoose.model('carts', cartSchema)
export default cartModel