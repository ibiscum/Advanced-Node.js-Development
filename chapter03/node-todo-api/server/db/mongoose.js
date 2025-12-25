import mongoose from 'mongoose';
let { connect } = mongoose;

connect('mongodb://root:password@localhost:27017/TodoApp');

export default mongoose;
