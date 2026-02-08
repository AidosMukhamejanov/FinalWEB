const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/eventController");

router.post("/", auth, c.create);
router.get("/", auth, c.getAll);
router.get("/:id", auth, c.getOne);
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);
router.get("/:id/weather", auth, c.getWeather);

module.exports = router;
