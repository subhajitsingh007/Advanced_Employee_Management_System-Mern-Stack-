import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        //these fields will be filled by admin so they are not required at the time of signup
        position:{
            type: String
            
        },
        department:{
            type: String
           
        },
        dateOfJoining:{
            type: Date
            
        },
        salary:{
            type: Number
            
        }
    },
    {
        timestamps: true
    }
   
)

export const UserModel = mongoose.model("User", userSchema)