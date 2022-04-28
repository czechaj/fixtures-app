const express = require("express");
const { Router } = require("express");
const pageController = require("../controllers/pageController");
const authMiddleware = require("../middlewares/authMiddleware");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/categories').get(pageController.getCategoriesPage);
router.route('/furnitures/:id').get(pageController.getFurnituresPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/signup').get(pageController.getSignupPage);
router.route('/cart').get(authMiddleware, pageController.getCartPage);
router.route('/admin').get(authMiddleware, pageController.getAdminPanel);

module.exports = router;
