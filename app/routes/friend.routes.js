const Router = require("express");
const router = new Router();
const controller = require("../controllers/friend.controller")
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");



router.get("/api/friends", authMiddleware, controller.getFriends);
router.get("/api/friend/:id", authMiddleware, controller.getFriend);
router.post("/api/friends", authMiddleware, controller.addFriend);
router.delete("/api/friends/:id", authMiddleware, controller.deleteFriend);

module.exports = router;