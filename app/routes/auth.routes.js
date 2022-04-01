const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");
const roleMiddleware = require("../middleware/role.middleware");
const validatorMiddleware = require("../middleware/validator.middleware");

const emailPassValidator = [
  check("password", "Password should be not less than 4, and no longer than 8 symbols").isLength({ min: 4, max: 10 }),
  check("email", "Invalid email").isEmail(),
];

router.post("/registration", [...emailPassValidator, validatorMiddleware], controller.registration);
router.post("/login", [...emailPassValidator, validatorMiddleware], controller.login);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);
router.get("/confirm/:confirmationCode", controller.verifyUser);
router.get("/refresh/:refreshToken", controller.refresh);

module.exports = router;
