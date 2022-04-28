const Category = require("../models/Category");
const Furniture = require("../models/Furniture");
const User = require("../models/User");

exports.createFurniture = async (req, res, next) => {
  await Furniture.create(req.body);
  req.flash("success", "Furniture created successfully");
  res.redirect("/admin");
};
exports.editFurniture = async (req, res) => {
  const furniture = await Furniture.findOne({ _id: req.params.id });
  furniture.name = req.body.name;
  furniture.image = req.body.image;
  furniture.price = req.body.price;
  furniture.category = furniture.category
  furniture.save();
  req.flash("success", "Furniture updated successfully");
  res.redirect("/admin");
};


exports.dropFurniture = async (req,res) => {
    await Furniture.findOneAndDelete({_id: req.params.id});
    req.flash('success', 'Furniture dropped successfully')
    res.redirect('/admin')

}

exports.purchaseFurniture = async (req,res) => {
  const user = await User.findById(req.session.userId)  
  const purchasedFurniture = await Furniture.findOne({_id: req.params.id});
  user.reserved.push(purchasedFurniture);
  user.save()  
  
  req.flash('success', 'Furniture added to your cart successfully')
  res.redirect('back')
}

exports.releaseFurniture = async (req,res) => {
  const user = await User.findById(req.session.userId)  
  const releasedFurniture = await Furniture.findOne({_id: req.params.id});
  user.reserved.pull(releasedFurniture);
  user.save()  
  
  
  req.flash('success', 'Furniture released successfully')
    res.redirect('/cart')

}

