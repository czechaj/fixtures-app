const express = require("express");
const { Router } = require("express");
const furnitureController = require("../controllers/furnitureController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();


router.route('/create').post(roleMiddleware(['admin']), furnitureController.createFurniture)
router.route('/edit/:id').put(roleMiddleware(['admin']), furnitureController.editFurniture)
router.route('/drop/:id').delete(roleMiddleware(['admin']), furnitureController.dropFurniture)
router.route('/reserve/:id').post(roleMiddleware(['client']),furnitureController.purchaseFurniture)
router.route('/release/:id').post(roleMiddleware(['client']), furnitureController.releaseFurniture)

module.exports = router