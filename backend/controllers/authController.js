const authService = require("../services/AuthService");
const logger = require("../utils/Logger"); // ✅ Import the logger singleton

class AuthController {
  // Register user
  async registerUser(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const result = await authService.registerUser({ name, email, password });
      res.status(201).json(result);
      logger.log(`New user registered: ${email}`);
    } catch (error) {
      logger.error(`Registration failed for ${email}: ${error.message}`);
      next(error);
    }
  }

  // Login user
  async loginUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await authService.loginUser({ email, password });
      res.json(result);
      logger.log(`User logged in: ${email}`);
    } catch (error) {
      logger.error(`Login failed for ${email}: ${error.message}`);
      next(error);
    }
  }

  // Get profile
  async getProfile(req, res, next) {
    try {
      const result = await authService.getProfile(req.user.id);
      res.status(200).json(result);
      logger.log(`Profile retrieved for user ID: ${req.user.id}`);
    } catch (error) {
      logger.error(
        `Failed to retrieve profile for user ID ${req.user.id}: ${error.message}`
      );
      next(error);
    }
  }

  // Update profile
  async updateUserProfile(req, res, next) {
    try {
      const result = await authService.updateUserProfile(req.user.id, req.body);
      res.json(result);
      logger.log(`Profile updated for user ID: ${req.user.id}`);
    } catch (error) {
      logger.error(
        `Failed to update profile for user ID ${req.user.id}: ${error.message}`
      );
      next(error);
    }
  }
}

module.exports = new AuthController();
