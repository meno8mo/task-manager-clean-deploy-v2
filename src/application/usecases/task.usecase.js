/**
 * Task Use Case - Business Logic Layer
 * 
 * STUDENT NOTE: The use case layer contains the business logic of your application.
 * It sits between the controller (HTTP layer) and the repository (database layer).
 * 
 * This layer:
 * - Defines what operations can be performed (create, read, update, delete)
 * - Calls the repository to interact with the database
 * - Could contain additional business rules (not needed for this simple app)
 * 
 * Think of it as the "brain" of your application that decides what to do.
 */

module.exports = (repository) => ({
  // Create a new task
  createTask: (dto) => repository.create(dto),

  // Get all tasks
  getTasks: () => repository.findAll(),

  // Get a single task by ID
  getTaskById: (id) => repository.findById(id),

  // Search tasks by title
  searchTasks: (title) => repository.findByTitle(title),

  // Update an existing task
  updateTask: (id, dto) => repository.update(id, dto),

  // Delete a task
  deleteTask: (id) => repository.delete(id)
});
