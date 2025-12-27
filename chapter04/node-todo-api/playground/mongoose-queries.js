import connectDB from './../server/db/mongoose.js';
import Todo from './../server/models/todo.js';
import { ObjectId } from 'mongodb';
// import { User } from './../server/models/user';

connectDB();

let id = '695041e50e5d9768e792363e';
if (ObjectId.isValid(id)) {
  console.log('ID is valid');
}

await Todo.find({ _id: id }).then((todos) => {
  console.log('Todos', todos);
});

await Todo.findOne({ _id: id }).then((todo) => {
  console.log('Todo', todo);
});

await Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('ID not found');
  }
  console.log('Todo by ID', todo);
}).catch((e) => console.log(e));

// User.findById('5a8708e0e40b324268c5206c').then((user) => {
//   if (!user) {
//     return console.log('Unable to find user');
//   }
//   console.log(JSON.stringify(user, undefined, 2));
// }, (e) => {
//   console.log(e);
// });
