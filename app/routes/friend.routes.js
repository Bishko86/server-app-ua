const Router = require("express");
const router = new Router();
const controller = require("../controllers/friend.controller")
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");



router.get("/api/friends", authMiddleware, controller.getFriends);
router.get("/api/friend/:id", authMiddleware, controller.getFriend);
router.post("/api/friends", authMiddleware, controller.addFriend);

module.exports = router;