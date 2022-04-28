const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required:true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

FurnitureSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Furniture = mongoose.model("Furniture", FurnitureSchema);

module.exports = Furniture;
