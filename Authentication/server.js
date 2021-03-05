// Import depandencies
require("dotenv").config()

const express = require("express")
const app = express()

// Import local depandencies
const mongoConnect = require("./configs/mongoDB")

// Import express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to MongoDB cluster
mongoConnect()

// Import route middlewares


// Run the server on port
const port = process.env.PORT

app.listen(port || 3000, () => {
    console.log(`Server is running on port 3000 or ${port}`);
})