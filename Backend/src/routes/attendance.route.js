import express from "express";
import { isAdmin, protectRoute } from "../middlewares/auth.middleware.js";
import { getMyAttendance , getAttendanceByEmployeeId , getAllAttendance , markAttendance ,checkIn,checkOut } from "../controllers/attendance.controller.js";


const router = express.Router()
//mark attendance for employee
router.post("/mark", protectRoute, markAttendance)

//get my attendance for employee
router.get("/my", protectRoute, getMyAttendance)

//get all attendance for admin
router.get("/admin/all", protectRoute, isAdmin, getAllAttendance)

//get attendance by employee id for admin
router.get("/admin/:id", protectRoute, isAdmin, getAttendanceByEmployeeId)
//check in and check out for employee
router.post("/checkin", protectRoute, checkIn);
router.post("/checkout", protectRoute, checkOut);


export default router