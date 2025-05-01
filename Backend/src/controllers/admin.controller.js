import { UserModel } from "../models/user.model.js";

//GET/API/admin/users
export const getAllEmployees = async(req,res) => {
    try{
        const users = await UserModel.find({role:"user"}).select("-password")
        res.status(200).json(users) 

    }catch(error){
        console.log("Error in getAllEmployees controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// GET /api/admin/employees/:id

export const getEmployeeById = async(req,res) =>{
    try{
        const employee = await UserModel.findById(req.params.id).select("-password")

        if(!employee || employee.role !== "user"){
            return res.status(404).json({message:"Employee not found"})
        }
        res.status(200).json(employee)

    } catch(error){
        console.log("Error in getEmployeeById controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// PUT /api/admin/employees/:id
export const updateEmployee = async(req,res) =>{
    try{
        const {name,position,department,dateOfJoining,salary} = req.body

        const employee = await UserModel.findById(req.params.id).select("-password")
        if(!employee || employee.role !== "user"){
            return res.status(404).json({message:"Employee not found"})
        }
        //update employee details
        employee.name = name || employee.name
        employee.email = email || employee.email
        employee.position = position || employee.position
        employee.department = department || employee.department
        employee.dateOfJoining = dateOfJoining || employee.dateOfJoining
        employee.salary = salary || employee.salary

        await employee.save()

        res.status(200).json({ message: "Employee updated successfully", employee })

    
    } catch(error){
        console.log("Error in updateEmployee controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

// DELETE /api/admin/employees/:id

export const deleteEmployee = async(req,res) =>{
    try{
        const employee = await UserModel.findByIds(req.params.id)
        if(!employee || employee.role !== "user"){
            return res.status(404).json({message:"Employee not found"})
        }
        //delete employee
        await employee.deleteOne()

        res.status(200).json({ message: "Employee deleted successfully" })

    } catch(error){
        console.log("Error in deleteEmployee controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }

}

export const promoteToAdmin = async(req,res) =>{
    try{
        const user = await UserModel.findById(req.params.id)

        if(!user ){
            return res.status(404).json({message:"User not found"})

        }

        if(user.role=="admin"){
            return res.status(400).json({message:"User is already an admin"})
        
        }

        //update user role to admin
        user.role = "admin"
        await user.save()

        res.status(200).json({message:"User promoted to admin successfully", user})


    } catch(error){
        console.log("Error in promoteToAdmin controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
} 

export const demoteToUser = async(req,res) =>{
    try{
        const user = await UserModel.findById(req.params.id).select("-password")

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        if(user.role=="user"){
            return res.status(400).json({message:"Employee is already an user and not an admin"})
        }

        //update user role to user
        user.role = "user"
        await user.save()

        res.status(200).json({message:"User demoted to user successfully", user})


    } catch(error){
        console.log("Error in demoteToUser controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}
   
