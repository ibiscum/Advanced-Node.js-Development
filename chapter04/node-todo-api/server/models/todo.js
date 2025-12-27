import { model } from 'mongoose';

var Todo = model('Todo', {
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
   }
});

export default {Todo};
