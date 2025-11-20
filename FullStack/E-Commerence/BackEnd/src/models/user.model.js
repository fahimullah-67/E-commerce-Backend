import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
         type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    password:{
         type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    address:[
        {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            zipCode: { type: String, trim: true },
            country: { type: String, trim: true },
        }
    ]
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User;
