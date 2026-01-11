const mongoose = require('mongoose');

/**
 * Task Schema - Defines the structure of a task in MongoDB
 * 
 * STUDENT NOTE: This schema defines what fields a task can have
 * and what type of data each field should contain.
 */
const TaskSchema = new mongoose.Schema({
  // Task title - required field
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true, // Remove whitespace from beginning and end
    minlength: [1, 'Title cannot be empty']
  },
  
  // Task description - optional field
  description: {
    type: String,
    default: '',
    trim: true
  },
  
  // Completion status - boolean (true/false)
  // IMPORTANT: Changed from 'status' enum to 'completed' boolean
  // This matches what the frontend expects
  completed: {
    type: Boolean,
    default: false
  },
  
  // Timestamp when task was created
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Schema options
  timestamps: true, // Automatically add createdAt and updatedAt
  toJSON: { virtuals: true }, // Include virtual fields when converting to JSON
  toObject: { virtuals: true } // Include virtual fields when converting to Object
});

/**
 * Virtual Field: 'id'
 * 
 * STUDENT NOTE: MongoDB uses '_id' by default, but our frontend expects 'id'
 * A virtual field creates a computed property that doesn't exist in the database
 * but appears when we send data to the frontend
 */
TaskSchema.virtual('id').get(function() {
  return this._id.toString();
});

module.exports = mongoose.model('Task', TaskSchema);
