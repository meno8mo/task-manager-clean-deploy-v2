/**
 * Task Repository - Data Access Layer
 * 
 * STUDENT NOTE: The repository is responsible for all database operations.
 * It's the ONLY place where we directly interact with MongoDB.
 * 
 * This pattern has benefits:
 * - Separates database logic from business logic
 * - Makes it easy to change databases later (just swap the repository)
 * - All database queries are in one place
 * 
 * Think of it as the "librarian" that knows how to find and store data.
 */

const TaskModel = require('./task.model');

module.exports = {
  // Create a new task in the database
  create: (data) => TaskModel.create(data),

  // Find all tasks
  findAll: () => TaskModel.find(),

  // Find a single task by its ID
  findById: (id) => TaskModel.findById(id),

  // Search for tasks by title (case-insensitive partial match)
  // STUDENT NOTE: $regex allows searching for partial matches
  // $options: 'i' makes it case-insensitive
  findByTitle: (title) =>
    TaskModel.find({
      title: { $regex: title, $options: 'i' }
    }),

  // Update a task and return the updated version
  // STUDENT NOTE: { new: true } returns the updated document instead of the old one
  update: (id, data) =>
    TaskModel.findByIdAndUpdate(id, data, { new: true }),

  // Delete a task by ID
  delete: (id) => TaskModel.findByIdAndDelete(id)
};
