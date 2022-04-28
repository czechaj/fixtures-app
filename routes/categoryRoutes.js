const express = require("express");
const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.route('/create').post(roleMiddleware('admin'), categoryController.createCategory)
router.route('/delete/:id').delete(roleMiddleware('admin'), categoryController.deleteCategory)
router.route('/edit/:id').put(roleMiddleware('admin'), categoryController.editcategory)

module.exports = router