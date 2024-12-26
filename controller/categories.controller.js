const { validationResult } = require("express-validator");
const categoryService = require("../services/categories.service");

// Add a new category
async function addCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { CategoryName, CategoryCode } = req.body;

  try {
    // Check if category already exists
    const categoryExists = await categoryService.findCategoryByName(CategoryName);
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create the category
    const newCategory = {
      CategoryName,
      CategoryCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await categoryService.createCategory(newCategory);

    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error in addCategory:", error);
    return res.status(500).json({ message: "Server error while adding category" });
  }
}

// Get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return res.status(500).json({ message: "Server error while retrieving categories" });
  }
}

module.exports = {
  addCategory,
  getAllCategories,
};
