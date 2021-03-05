// Import depandencies
const mongoose = require("mongoose")

// Import local depandencies

// connect mongoDB function
const URL = process.env.URL
const mongoConnect = () => {
    mongoose.connect(URL, { useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true}, function(err, data) {
        if(data && !err) {
            console.log("Successfully connected to MongoDB");
        } else {
            console.log(err);
        }
    })
}

module.exports = mongoConnect
