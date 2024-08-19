const { check, validationResult } = require("express-validator");

const validateLogin = [
  check("email")
    .isEmail()
    .withMessage("Email không hợp lệ!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map(error => ({
          field: error.param,
          message: error.msg
        }))
      });
    }
    next();
  }
];

module.exports = validateLogin;
