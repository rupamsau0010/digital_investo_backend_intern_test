// Import depandencies
const jwt = require("jsonwebtoken");

// Import local depandencies
const User = require("../models/User");

// Handel Errors...
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", phoneNo: "", password: ""};

    // Incorrect Email while login...
    if (err.message === "Incorrect Email") {
        errors.email = "That email is not Registrated. Consider Signup.";
        return errors;
    }

    // Incorrect Password while login...
    if (err.message === "Incorrect Password") {
        errors.password = "That Password is incorrect. Try Again.";
        return errors;
    }

    // duplicate error handel...
    if(err.code === 11000) {
        if(err.keyPattern.phoneNo === 1) {
            errors.phoneNo = "Phone Number is already registrated";
            return errors;
        } else {
            errors.email = "email is already registrated";
            return errors;
        }
    }

    // Validation Errors...
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Use JWT...
const maxAge = 3 * 24 * 60 * 60; // 3 days valid...

// Create a new JWT...
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

// Post request controller for signup...
module.exports.signup_post = async (req, res) => {
    const {name, email, password, phoneNo} = req.body; // Getting the data from the frontend using body-parser...

    try {
        const user = await User.create({ name, email, password, phoneNo }); // Creating new user...
        const token = createToken(user._id); // Creating JWT token...
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000}); // Creating a cookie using JWT and cookie-parser in the clieny's browser...
        console.log("User Created successfully...");
        res.status(201).json({ user: user._id }); // Sending Result to the frontend Signup form controller "<script> Here </script>"...
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handel it...
        res.status(400).send(errors);  // Sending Result to the frontend Signup form controller "<script> Here </script>"...
    }   
}

// Post request controller for login...
module.exports.login_post = async (req, res) => {
    const {email, password} = req.body; // Getting the data from the frontend using body-parser...

    // console.log(email + "\n" + password);
    // res.send("login post");

    try {
        const user = await User.login(email, password);  // Login the user using Statics function of User data model...
        const token = createToken(user._id);  // Creating JWT token...
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});  // Creating a cookie using JWT and cookie-parser in the clieny's browser...
        res.status(200).json({ user: user._id });  // Sending Result to the frontend Signup form controller "<script> Here </script>"...
    } catch(err) {
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handel it...
        res.status(400).json({ errors });  // Sending Result to the frontend Signup form controller "<script> Here </script>"...
    }
}

// Post request controller for logout...
module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });  // Creating a JWT token for 1 ms and expireing it immidiately...
    res.redirect("/");
}

// Get Request for getting user details...
module.exports.getUserDetails_get = (req, res) => {
    User.findOne({ email: req.body.email }, function(err1, data1) {
        if(data1 && !err1) {
            res.json({
                status: "success",
                name: data1.name,
                email: data1.email,
                phoneNo: data1.phoneNo
            })
        } else {
            res.json({
                status: "failure",
                msg: "Might be a internal server error. Please try again later.", 
                name: "not found",
                email: "not found"
            })
        }
    })
}