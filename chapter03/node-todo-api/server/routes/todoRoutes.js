import express from 'express';
import { getTodos, createTodo } from '../controllers/todoController.js';

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
  //  router.get('/users/:id', getUser);

  //  router.put('/users/:id', updateUser);
  //  router.delete('/users/:id', deleteUser);

export default router;
