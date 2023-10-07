const router = require("express").Router();
const Category = require("../models/CategoryModel");

// CREATE CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json({
      success: true,
      saveCat,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
