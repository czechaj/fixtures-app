const Category = require('../models/Category')

exports.createCategory = async(req,res) => {
    await Category.create(req.body)
    await req.flash('success', 'Category created successfully')
    res.redirect('/admin')
}

exports.editcategory = async (req,res) => {
    const category = await Category.findOne({_id: req.params.id});
    category.name = req.body.name
    category.save()
    req.flash('success', 'Category updated successfully')
    res.redirect('back')
}
exports.deleteCategory = async (req,res) => {
    await Category.findOneAndDelete({_id: req.params.id});
    req.flash('success', 'Category deleted successfully')
    res.redirect('back')
}