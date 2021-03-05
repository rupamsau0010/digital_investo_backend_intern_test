// Import depandencies
require("dotenv").config()

const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");

// Import local depandencies
const mongoConnect = require("./configs/mongoDB")
const authRoutes = require("./routes/authRoutes")
const { requireAuth } = require(".//middlewares/authMiddleware")

// Import express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// connect to MongoDB cluster
mongoConnect()

// Import route middlewares
app.use("/api/user/", authRoutes)

// Run the server on port
const port = process.env.PORT

app.listen(port || 3000, () => {
    console.log(`Server is running on port 3000 or ${port}`);
})