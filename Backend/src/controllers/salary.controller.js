import { UserModel } from "../models/user.model.js";
import { salaryModel } from "../models/salary.model.js";

// Admin - Create salary record

export const createSalary = async (req,res) =>{
    const {userId , basicSalary , bonus , deductions , month} = req.body
    try{
        

        if(!userId || !basicSalary || !bonus || !deductions || !month){
            return res.status(400).json({message:"Please provide all the required fields"})
        }

        //check if user exists
        const user = await UserModel.findById(userId).select("-password")

        if(!user || user.role !== "user"){
            return res.status(404).json({message:"User not found"})
        }

        //check if salary record already exists for the month
        const existingSalary = await salaryModel.findOne({user:userId, month})

        if(existingSalary){
            return res.status(400).json({message:"Salary record already exists for this month"})
        }

         // Calculate total salary
         const netSalary = basicSalary + (bonus || 0) - (deductions || 0);

        //create salary record
        const newSalary = await salaryModel.create({
            user:userId,
            basicSalary,
            bonus,
            deductions,
            netSalary,
            month
        })

        res.status(201).json({
            success:true,
            message:"Salary record created successfully",
            data: newSalary
           
        })




    } catch(error){
        console.log("Error in create salary controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

//get mysalary (for employee)

export const getMySalary = async(req,res) =>{
    try{
        // req.user._id comes from protectRoute middleware after verifying JWT
        const salary = await salaryModel.find({ user: req.user._id }).sort({ createdAt: -1 })

        if(!salary){
            return res.status(404).json({message:"Salary record not found"})
        }

        return res.status(201).json({
            success:true,
            message:"Salary record fetched successfully",
            count: salary.length,
            data: salary
        })


    } catch(error){
        console.log("Error in get my salary controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

//get all salary records (for admin)

export const getAllSalary = async (req,res) =>{
    try{
        const salary = await salaryModel.find({}).populate("user", "-password").sort({ createdAt: -1 }) //newest first 

        if(!salary || salary.length === 0){
            return res.status(404).json({message:"Salary records not found"})
        }

        return res.status(201).json({
            success:true,
            message:"Salary records fetched successfully",
            count: salary.length,
            data: salary
        })


    } catch(error){
        console.log("Error in get all salary controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// Admin - Update an employee's salary record

export const updateSalary = async(req,res) =>{
    try{
         const { id } = req.params; // Salary record ID from URL
         const {basicSalary , bonus ,deductions } = req.body; // New salary details from request body

         const salaryRecord = await salaryModel.findById(id); // Find the salary record by ID

         if(!salaryRecord){
            return res.status(404).json({message:"Salary record not found"})
         }

          // Update only the fields if provided
          if(basicSalary !== undefined) salaryRecord.basicSalary = basicSalary
          if(bonus !== undefined) salaryRecord.bonus = bonus
          if(deductions !== undefined) salaryRecord.deductions = deductions

          //save updated salary 
          await salaryRecord.save()

          res.status(200).json({
            success:true,
            message:"Salary record updated successfully",
            data: salaryRecord
          })



    } catch(error){
        console.log("Error in update salary controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}
