import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: ["present", "absent", "On leave"],
        required: true
    },
    attendanceLog:[{
        logDate:{
            type: Date,
            default: Date.now
        },
        logStatus:{
            type: String,
            enum: ["present", "absent", "On leave"],
            required: true,
            default: "absent"
        },
        checkIn: {
            type: Date,
          },
          checkOut: {
            type: Date,
          }
    }
  ]
},{
    timestamps: true
})

export const AttendanceModel = mongoose.model("Attendance", attendanceSchema)