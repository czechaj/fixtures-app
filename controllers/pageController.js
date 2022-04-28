const User = require("../models/User");
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");

exports.getIndexPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  res.render("index", {
    user,
    page_name: "home",
  });
};
exports.getContactPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  res.render("contact", {
    user,
    page_name: "contact",
  });
};
exports.getAboutPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  res.render("about", {
    user,
    page_name: "about",
  });
};
exports.getCategoriesPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  const categories = await Category.find({}).sort('name')
  res.render("categories", {
    user,
    categories,
    page_name: "categories",
  });
};
exports.getFurnituresPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  const furnitures = await Furniture.find({category: req.params.id}).populate('category')
  res.render("furnitures", {
    user,
    furnitures,
    page_name: "furnitures",
  });
};
exports.getLoginPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  res.render("login", {
    user,
    page_name: "login",
  });
};
exports.getSignupPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  res.render("signup", {
    user,
    page_name: "signup",
  });
};
exports.getCartPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId }).populate('reserved');
  res.render("cart", {
    user,
    page_name: "cart",
  });
};
exports.getAdminPanel = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
  const users = await User.find({}).populate('reserved')
  const categories = await Category.find()
  const totalFurnitures = await Furniture.find().countDocuments()
  const page = req.query.page || 1;
  const furnituresPerPage = 3;
  const furnitures = await Furniture.find({}).populate('category').sort('category').skip((page - 1) * furnituresPerPage).limit(furnituresPerPage) ;
  res.render("admin", {
    user,
    users,  
    categories,
    furnitures,
    page_name: "admin",
    pages: Math.ceil(totalFurnitures / furnituresPerPage),
    current: page
  });
};
