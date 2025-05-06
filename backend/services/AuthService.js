const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorFactory } = require("../utils/ErrorFactory");

class AuthService {
  // Generate JWT token
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }

  // Register user logic
  async registerUser({ name, email, password }) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw ErrorFactory.create("ValidationError", "User already exists");
    }

    const user = await User.create({ name, email, password });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user.id),
    };
  }

  // Login user logic
  async loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: this.generateToken(user.id),
      };
    } else {
      throw ErrorFactory.create("AuthError", "Invalid email or password");
    }
  }

  // Get profile logic
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw ErrorFactory.create("NotFoundError", "User not found");
    }

    return {
      name: user.name,
      email: user.email,
      university: user.university,
      address: user.address,
    };
  }

  // Update profile logic
  async updateUserProfile(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw ErrorFactory.create("NotFoundError", "User not found");
    }

    const { name, email, university, address } = updateData;

    user.name = name || user.name;
    user.email = email || user.email;
    user.university = university || user.university;
    user.address = address || user.address;

    const updatedUser = await user.save();

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      university: updatedUser.university,
      address: updatedUser.address,
      token: this.generateToken(updatedUser.id),
    };
  }
}

module.exports = new AuthService();
