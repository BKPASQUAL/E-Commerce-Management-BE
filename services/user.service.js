const { getUsersCollection } = require("../config/db");

async function findUserByEmail(email) {
  try {
    const usersCollection = getUsersCollection();
    return await usersCollection.findOne({ email });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Database query error");
  }
}

async function createUser(userData) {
  try {
    const usersCollection = getUsersCollection();
    const result = await usersCollection.insertOne(userData);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database insertion error");
  }
}

async function getAllUsers(req, res) {
  try {
    const usersCollection = getUsersCollection();
    return await usersCollection.find({}).toArray(); 
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving product" });
  }
}

async function getUserCount() {
  try {
    const usersCollection = getUsersCollection();
    return await usersCollection.countDocuments(); 
  } catch (error) {
    console.error("Error getting user count:", error);
    throw new Error("Database query error");
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  getUserCount, 
};

