import Todos from '../models/todo.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find();
    console.log(todos);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 export const createTodo = async (req, res) => {
  console.log(req.body);

  const { text, completed, completedAt } = req.body;

  //  const userExists = await User.findOne({ email });
  //  if (userExists) {
  //    return res.status(400).json({ message: 'User already exists' });
  //  }

   const todo = new Todos({
    text,
    completed,
    completedAt
   });

   try {
     const newTodo = await todo.save();
     res.status(201).json(newTodo);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
 };

//  exports.updateUser = async (req, res) => {
//    try {
//      const user = await User.findById(req.params.id);
//      if (!user) {
//        return res.status(404).json({ message: 'User not found' });
//      }

//      user.name = req.body.name || user.name;
//      user.email = req.body.email || user.email;
//      user.password = req.body.password || user.password;

//      const updatedUser = await user.save();
//      res.json(updatedUser);
//    } catch (error) {
//      res.status(400).json({ message: error.message });
//    }
//  };

//  exports.getUser = async (req, res) => {
//    try {
//      const user = await User.findById(req.params.id);
//      if (!user) {
//        return res.status(404).json({ message: 'User not found' });
//      }
//      res.json(user);
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  };



//  exports.deleteUser = async (req, res) => {
//    try {
//      const user = await User.findById(req.params.id);
//      if (!user) {
//        return res.status(404).json({ message: 'User not found' });
//      }

//      await user.remove();
//      res.json({ message: 'User deleted' });
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  };
