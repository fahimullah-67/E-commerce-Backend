import moongoose from "mongose";

const cartSchema = new moongoose.schema({
    userID:{
        type:moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        unique:true, // One cart per user 
    },
    products:[
        {
            productID:{
                type:moongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            },
        }
    ]
},{
    timestamps:true,
})

const Cart = moongoose.model("Cart", moongoose.cartSchema);
export default Cart;

