/**
 * Express Application Setup
 * 
 * STUDENT NOTE: This file sets up the Express application.
 * Express is a web framework for Node.js that makes it easy to create APIs.
 * 
 * The setup follows this order:
 * 1. Import dependencies
 * 2. Create Express app
 * 3. Add middleware (functions that process requests)
 * 4. Define routes (URL endpoints)
 * 5. Add error handling
 */

const express = require('express');
const cors = require('cors');

// Import our custom modules
const taskRepository = require('./infrastructure/database/mongo/task.repository');
const taskUsecaseFactory = require('./application/usecases/task.usecase');
const taskControllerFactory = require('./interfaces/http/controllers/task.controller');
const taskRoutesFactory = require('./interfaces/http/routes/task.routes');

// Create Express application instance
const app = express();

/**
 * MIDDLEWARE SETUP
 * Middleware functions run before your route handlers
 * They can modify the request/response or perform checks
 */

// 1. CORS - Allow frontend to make requests from different origin
// STUDENT NOTE: CORS = Cross-Origin Resource Sharing
// This allows your Vue frontend (http://localhost:5173) to talk to your backend (http://localhost:3000)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','https://playful-cassata-b06927.netlify.app'], // Allow Vite dev server
    credentials: true
}));

// 2. JSON Parser - Parse incoming JSON data in request body
// STUDENT NOTE: This middleware converts JSON strings to JavaScript objects
app.use(express.json());

// 3. Request Logger - Log all incoming requests (helpful for debugging)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next(); // Pass control to next middleware
});

/**
 * DEPENDENCY INJECTION PATTERN
 * 
 * STUDENT NOTE: We create instances in a specific order:
 * Repository → UseCase → Controller → Routes
 * Each layer depends on the previous one
 */
const taskUsecase = taskUsecaseFactory(taskRepository);
const taskController = taskControllerFactory(taskUsecase);

/**
 * ROUTES
 * Define API endpoints
 */
app.use('/api/tasks', taskRoutesFactory(taskController));

// Health check endpoint - useful to verify server is running
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

/**
 * ERROR HANDLING MIDDLEWARE
 * 
 * STUDENT NOTE: This catches any errors that weren't handled elsewhere
 * It must be defined AFTER all routes
 */

// 404 Handler - Route not found
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

module.exports = app;

