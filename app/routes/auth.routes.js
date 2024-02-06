const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");
const roleMiddleware = require("../middleware/role.middleware");
const validatorMiddleware = require("../middleware/validator.middleware");
const validatorMessage = require('../constants/validation-messages');

const emailPassValidator = [
  check("username", validatorMessage.name).notEmpty(),
  check("password", validatorMessage.password).isLength({ min: 4, max: 10 }),
  check("email", validatorMessage.email).isEmail(),
];

router.post("/registration", [...emailPassValidator, validatorMiddleware], controller.registration);
router.post("/login", [...emailPassValidator.slice(1), validatorMiddleware], controller.login);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);
router.get("/confirm/:confirmationCode", controller.verifyUser);
router.get("/refresh", controller.refresh);

module.exports = router;
