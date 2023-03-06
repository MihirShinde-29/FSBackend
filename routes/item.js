const router = require("express").Router();
const item = require("../controllers/item");
const upload = require("../middleware/upload");

router.get("/", item.getItems);
router.post("/", upload.single("image"), item.createItem);
router.put("/:id", upload.single("image"), item.updateItem);
router.delete("/:id", item.deleteItem);

module.exports = router;
