const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/registration",
  [
    check("username", "Username cannot be empty").notEmpty(),
    check("password","Password should be not less than 4, and no longer than 8 symbols").isLength({ min: 4, max: 10 }),
    check("email", "Invalid email").isEmail(),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);
router.get("/confirm/:confirmationCode", controller.verifyUser);

module.exports = router;
