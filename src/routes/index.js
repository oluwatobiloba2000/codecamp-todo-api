// declare routes
import Router from 'express';
import TodoController from '../controllers';

// initialize Router
const appRouter = Router();

// req - request
// res - response
appRouter.get('/', (req, res) => {
  return res.json({ message: 'Welcome to our todos API' });
});

// GET /todos - get all of the todos we have in the system
appRouter.get('/api/v1/todos', TodoController.getAllTodos);

// GET /todos/:id
appRouter.get('/api/v1/todos/:id', TodoController.getTodoById);

// POST /todos - post a new todo
appRouter.post('/api/v1/todos', TodoController.createTodo);

// PUT /todos/:id
appRouter.put('/api/v1/todos/:id', TodoController.updateTodo);

// DELETE /todos/:id
appRouter.delete('/api/v1/todos/:id', TodoController.deleteTodo);

appRouter.use('*', (req, res) => {
  return res.send('Route not found');
});

module.exports= appRouter;
