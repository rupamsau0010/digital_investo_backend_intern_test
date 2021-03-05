// Import depandencies
const { Router } = require("express")
const router = Router()

// Import local depandencies
const authController = require("../controllers/authController")
const { requireAuth } = require("../middlewares/authMiddleware")

// post signup
router.post("/signup", authController.signup_post);

// post login
router.post("/login", authController.login_post);

// get user details
router.get("/detail", requireAuth, authController.getUserDetails_get)

module.exports = router;