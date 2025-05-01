import mongoose from 'mongoose'

const salarySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true

    },
    basicSalary:{
        type: Number,
        required: true
    },
    bonus:{
        type: Number,
        required: true
    },
    deductions:{
        type: Number,
        required: true
    },
    netSalary:{
        type: Number,
        required: true
    },
    month:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    
},
{
    timestamps: true
})

export const salaryModel = mongoose.model("Salary", salarySchema)