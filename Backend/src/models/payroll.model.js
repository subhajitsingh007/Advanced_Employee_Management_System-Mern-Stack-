import mongoose from 'mongoose';

const payRollSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        month:{
            type:String,
            required:true
        },
        salaryPaid:{
            type:Number, 
            required:true
        },
        paymentDate:{
            type:Date,
            default:Date.now
        }
    },
    {
        timestamps: true
    }

)

export const PayRollModel = mongoose.model("PayRoll", payRollSchema)