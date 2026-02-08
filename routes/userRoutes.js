const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/userController");

router.get("/profile", auth, c.getProfile);
router.put("/profile", auth, c.updateProfile);

module.exports = router;
