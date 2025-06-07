import express from 'express';
import {isAdmin, protectRoute} from '../middlewares/auth.middleware.js'
import {applyLeave, getAllLeaves, getMyLeaves, updateLeaveStatus} from '../controllers/leave.controller.js'

const router = express.Router()

//apply leaves for employee
router.post("apply",protectRoute,applyLeave)

//get all leaves for employee (for each employee)
router.get("my",protectRoute,getAllLeaves)

//view all leave requests (for admin)
router.get("all",protectRoute,isAdmin,getMyLeaves)

//approve leave request (for admin)
router.put("update/:id",protectRoute,isAdmin,updateLeaveStatus)



export default router
