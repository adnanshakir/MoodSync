const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/auth.controller");
const authUserMiddleware = require("../middleware/auth.middleware");

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/get-me", authUserMiddleware.authUser, authController.getMe);
authRouter.post("/logout", authUserMiddleware.authUser, authController.logoutUser);

module.exports = authRouter;
