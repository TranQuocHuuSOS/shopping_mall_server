const Router = require("express");
const {
  register,
  login,
  verification,
  forgotPassword,
  logout,
  getUsers
} = require("../controllers/authController");
const validateLogin = require("../middlewares/authValidatorMiddleWare");
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verification", verification);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.post("/logout", logout);
authRouter.get("/getUsers", getUsers);
module.exports = authRouter;
