import express from 'express';
import { isAdmin , protectRoute  } from '../middlewares/auth.middleware.js';
import {getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee,promoteToAdmin,demoteToUser} from '../controllers/admin.controller.js'


const router = express.Router()

//Employee management routes

//get all employees
router.get("/employees",protectRoute,isAdmin,getAllEmployees)

//get employee by id
router.get("/employees/:id", getEmployeeById)

//update employee
router.put("/employees/:id",protectRoute,isAdmin,updateEmployee)

//delete employee
router.delete("/employees/:id",protectRoute,isAdmin,deleteEmployee)

//promote employee to admin
router.put("/promote/:id", promoteToAdmin)

//demote employee to user
router.put("/demote/:id", demoteToUser)
export default router