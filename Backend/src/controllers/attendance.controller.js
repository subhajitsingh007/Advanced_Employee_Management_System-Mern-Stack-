import { AttendanceModel } from "../models/attendance.model.js";


// Employee - Mark Attendance

export const markAttendance = async (req,res) =>{
    const employeeId = req.user._id; // Get employee ID from the request
    const {logStatus} = req.body; // Get attendance status from the request body
    try{
      // check if employee already has an attendance record 
      let attendance = await AttendanceModel.findOne({employee: employeeId})
      if (!attendance) {
        // If not exist, create a new attendance document
        attendance = new AttendanceModel({
            employee: employeeId,
            status: logStatus,
            attendanceLog: [{ logStatus }]
        })
    } else {
        // If exist, push new log
        attendance.status = logStatus; // update latest status
        attendance.attendanceLog.push({ logStatus });
    }

    await attendance.save(); // Save the attendance document
    res.status(200).json({message: "Attendance marked successfully", attendance}); // Send success response

    } catch(error){
        console.log("Error in markAttendance controller",error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

// Employee - Get Attendance

export const getMyAttendance = async (req,res) =>{
    const employeeId = req.user._id // Get employee ID from the request
    try{
        const attendance = await AttendanceModel.findOne({employee: employeeId}) // Find attendance record for the employee

        if(!attendance){
            return res.status(404).json({message: "Attendance record not found"}); // If not found, send 404 response
        }

        res.status(200).json({attendance}); // Send attendance record in response




    } catch(error){
        console.log("Error in getMyAttendance controller",error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

// Admin - Get All Attendance

export const getAllAttendance = async (req,res) =>{
    try{
        const records = await AttendanceModel.find()
        .populate("employee", "name email position department dateOfJoining salary")
        .sort({createdAt:-1}) // Find all attendance records and populate employee details

        res.status(200).json({records})



    } catch(error){
        console.log("Error in getAllAttendance controller",error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

// Admin - Get Attendance by Employee ID

export const getAttendanceByEmployeeId = async (req,res) =>{
    const employeeId = req.params.id // Get employee ID from request parameters
    try{
        const attendance = await AttendanceModel.findOne({employee: employeeId}) // Find attendance record for the employee

        if(!attendance){
            return res.status(404).json({message: "Attendance record not found"}); // If not found, send 404 response
        }

        res.status(200).json({attendance}); // Send attendance record in response

    } catch(error){
        console.log("Error in getAttendanceByEmployeeId controller",error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

// check IN 
export const checkIn = async (req, res) => {
    const employeeId = req.user._id;
    const { logStatus } = req.body;
  
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      let attendance = await AttendanceModel.findOne({ employee: employeeId });
  
      if (!attendance) {
        attendance = new AttendanceModel({
          employee: employeeId,
          status: logStatus,
          attendanceLog: [{
            logDate: new Date(),
            logStatus,
            checkIn: new Date()
          }]
        });
      } else {
        // Check if already checked in today
        const alreadyLogged = attendance.attendanceLog.find(log =>
          log.logDate.toISOString().split("T")[0] === today
        );
  
        if (alreadyLogged) {
          return res.status(400).json({ message: "Already checked in today" });
        }
  
        attendance.status = logStatus;
        attendance.attendanceLog.push({
          logDate: new Date(),
          logStatus,
          checkIn: new Date()
        });
      }
  
      await attendance.save();
      res.status(200).json({ message: "Checked in successfully", attendance });
  
    } catch (err) {
      console.error("Check-in error:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// check OUT
export const checkOut = async (req, res) => {
    const employeeId = req.user._id;
  
    try {
      const today = new Date().toISOString().split("T")[0];
      const attendance = await AttendanceModel.findOne({ employee: employeeId });
  
      if (!attendance) {
        return res.status(404).json({ message: "No attendance record found" });
      }
  
      const todayLog = attendance.attendanceLog.find(log =>
        log.logDate.toISOString().split("T")[0] === today
      );
  
      if (!todayLog) {
        return res.status(400).json({ message: "No check-in found for today" });
      }
  
      if (todayLog.checkOut) {
        return res.status(400).json({ message: "Already checked out today" });
      }
  
      todayLog.checkOut = new Date();
      await attendance.save();
  
      res.status(200).json({ message: "Checked out successfully", attendance });
  
    } catch (err) {
      console.error("Check-out error:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  