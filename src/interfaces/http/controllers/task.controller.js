const createDTO = require('../../../application/dto/create-task.dto');
const updateDTO = require('../../../application/dto/update-task.dto');

/**
 * Task Controller - Handles HTTP requests and responses
 * 
 * STUDENT NOTE: The controller is the layer that receives HTTP requests,
 * calls the business logic (usecase), and sends back HTTP responses.
 * It's responsible for:
 * 1. Validating input using DTOs
 * 2. Calling the appropriate usecase method
 * 3. Handling errors and sending proper status codes
 */

module.exports = (usecase) => ({
  /**
   * CREATE - Add a new task
   * POST /api/tasks
   */
  create: async (req, res) => {
    try {
      const dto = createDTO(req.body); // Validate and transform input
      const task = await usecase.createTask(dto);
      res.status(201).json(task); // 201 = Created
    } catch (error) {
      console.error('Error creating task:', error.message);
      res.status(400).json({
        error: error.message || 'Failed to create task'
      });
    }
  },

  /**
   * READ ALL - Get all tasks
   * GET /api/tasks
   */
  getAll: async (req, res) => {
    try {
      const tasks = await usecase.getTasks();
      res.json(tasks); // 200 OK (default)
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      res.status(500).json({
        error: 'Failed to fetch tasks'
      });
    }
  },

  /**
   * SEARCH - Find tasks by title
   * GET /api/tasks/search?title=keyword
   */
  search: async (req, res) => {
    try {
      const tasks = await usecase.searchTasks(req.query.title || '');
      res.json(tasks);
    } catch (error) {
      console.error('Error searching tasks:', error.message);
      res.status(500).json({
        error: 'Failed to search tasks'
      });
    }
  },

  /**
   * UPDATE - Modify an existing task
   * PUT /api/tasks/:id
   */
  update: async (req, res) => {
    try {
      console.log('📝 UPDATE REQUEST - ID:', req.params.id);
      console.log('📝 UPDATE REQUEST - Body:', JSON.stringify(req.body, null, 2));

      const dto = updateDTO(req.body); // Validate update data
      console.log('📝 UPDATE REQUEST - DTO:', JSON.stringify(dto, null, 2));

      const task = await usecase.updateTask(req.params.id, dto);

      if (!task) {
        return res.status(404).json({
          error: 'Task not found'
        });
      }

      res.json(task);
    } catch (error) {
      console.error('❌ Error updating task:', error.message);
      console.error('❌ Full error:', error);
      res.status(400).json({
        error: error.message || 'Failed to update task'
      });
    }
  },

  /**
   * DELETE - Remove a task
   * DELETE /api/tasks/:id
   */
  delete: async (req, res) => {
    try {
      const task = await usecase.deleteTask(req.params.id);

      if (!task) {
        return res.status(404).json({
          error: 'Task not found'
        });
      }

      res.status(204).send(); // 204 = No Content (successful deletion)
    } catch (error) {
      console.error('Error deleting task:', error.message);
      res.status(500).json({
        error: 'Failed to delete task'
      });
    }
  }
});
