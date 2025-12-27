import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
},
  { collection: 'Todos' }
);

const Todo = model('Todo', todoSchema);

export default Todo;
