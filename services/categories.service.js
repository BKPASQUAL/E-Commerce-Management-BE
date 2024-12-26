const { getCategoriesCollection } = require("../config/db");

async function findCategoryByName(name) {
  try {
    const categoriesCollection = getCategoriesCollection();
    return await categoriesCollection.findOne({ CategoryName: name });
  } catch (error) {
    console.error("Error finding category by name:", error);
    throw new Error("Database query error");
  }
}

async function createCategory(categoryData) {
  try {
    const categoriesCollection = getCategoriesCollection();
    const result = await categoriesCollection.insertOne(categoryData);
    return result;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Database insertion error");
  }
}

module.exports = {
  findCategoryByName,
  createCategory,
};
