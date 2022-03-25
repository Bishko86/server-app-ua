const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");
const roleMiddleware = require("../middleware/roleMiddleware");
const validatorMiddleware = require("../middleware/validator.middleware");

const emailPassValidator = [
  check("username", "Username cannot be empty").notEmpty(),
  check("password", "Password should be not less than 4, and no longer than 8 symbols").isLength({ min: 4, max: 10 }),
  check("email", "Invalid email").isEmail(),
];

router.post("/registration", [...emailPassValidator, validatorMiddleware], controller.registration);
router.post("/login", [...emailPassValidator, validatorMiddleware], controller.login);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);
router.get("/confirm/:confirmationCode", controller.verifyUser);

module.exports = router;
