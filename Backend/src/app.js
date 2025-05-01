import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import leaveRoutes from './routes/leave.route.js'
import salaryRoutes from './routes/salary.route.js'
import attendanceRoutes from './routes/attendance.route.js'




const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json()) // Middleware to parse JSON requests

app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/auth", authRoutes)// Authentication routes
app.use("/api/admin", adminRoutes)// Admin routes
app.use("/api/leave", leaveRoutes)// Leave management routes
app.use("/api/salary", salaryRoutes)// Salary management routes
app.use("/api/attendance", attendanceRoutes)// Attendance management routes



export default app

