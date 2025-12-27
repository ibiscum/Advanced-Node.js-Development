import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
},
  { collection: 'User' }
);

const User = model('User', userSchema);

export default User;
