/**
 * Update Task DTO (Data Transfer Object)
 * 
 * STUDENT NOTE: This DTO handles task updates. Unlike create, updates can be partial
 * (you don't need to send all fields, only the ones you want to change).
 * 
 * For example, you can update just the 'completed' status without changing the title.
 */

module.exports = (data) => {
  const updateData = {};

  // Only include fields that are provided in the request
  // This allows partial updates

  if (data.title !== undefined) {
    if (!data.title.trim()) {
      throw new Error('Title cannot be empty');
    }
    updateData.title = data.title.trim();
  }

  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  if (data.completed !== undefined) {
    // Validate that completed is a boolean
    if (typeof data.completed !== 'boolean') {
      throw new Error('Completed must be true or false');
    }
    updateData.completed = data.completed;
  }

  // Return the validated update data
  return updateData;
};
