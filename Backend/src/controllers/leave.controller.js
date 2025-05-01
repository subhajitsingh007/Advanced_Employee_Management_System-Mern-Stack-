import { leaveRequestModel } from "../models/leaveRequest.model.js";

//apply for leaves

export const applyLeave = async(req,res) =>{
    try{
        const {leaveType, startDate, endDate, reason} = req.body
        
        if(!leaveType || !startDate || !endDate){
            return res.status(400).json({
                message:"Please provide all the required fields"
            })
        }

    
        const leaveRequest = await leaveRequestModel.create({
            user:req.user._id, //from protectRoute middleware
            leaveType,
            startDate,
            endDate,
            reason
        }) 

        res.status(201).json({
            message:"Leave request created successfully",
            leaveRequest
        })

       

    } catch(error){
        console.log("Error in apply leave controller",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//get all leaves for employee (for each employee)

export const getMyLeaves = async (req,res) =>{
    try{
        const leaves = await LeaveModel.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Leaves fetched successfully",
            leaves
        })

    } catch(error){
        console.log("Error in get my leaves controller",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//get all leave requests (for admin)

export const getAllLeaves = async (req,res) =>{
    try{
        const leaves = await leaveRequestModel.find()
        .populate('user', 'name email') // showing user basic info
        .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "All leaves fetched successfully",
            leaves
        })


    } catch(error){
        console.log("Error in get all leaves controller",error)
        res.status(500).json({
            message:"Internal server error"
        })

    }
}

// Update Leave Status (Approve/Reject)


export const updateLeaveStatus = async (req,res) =>{
    try{
        const {id} = req.params
        const {status} = req.body // status can be "approved" or "rejected"

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const LeaveRequest = await leaveRequestModel.findById(id)
        if (!LeaveRequest) {
            return res.status(404).json({ message: "Leave request not found" });
        }

        leave.status = status // update the status of leave request
        await LeaveRequest.save() // save the updated leave request

        res.status(200).json({
            message: `Leave request ${status} successfully`,
            leaveRequest: LeaveRequest
        })


    } catch(error){
        console.log("Error in update leave status controller",error)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
