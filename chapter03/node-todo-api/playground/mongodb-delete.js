import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://root:password@localhost:27017/');
const dbName = 'TodoApp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('connected successfully to server');

  const db = client.db(dbName);
  const todos = db.collection('Todos');
  const users = db.collection('Users');

  let deleteResult = await todos.deleteOne({text: 'Eat lunch'});
  console.log('Deleted todos =>', deleteResult);

  deleteResult = await todos.deleteMany({text: 'Eat lunch'});
  console.log('Deleted todos =>', deleteResult);

  deleteResult = await todos.findOneAndDelete({completed: false});
  console.log('Deleted todos =>', JSON.stringify(deleteResult, undefined, 2));

  deleteResult = await users.deleteMany({name: 'Andrew'});
  console.log('Deleted users =>', JSON.stringify(deleteResult, undefined, 2));

  deleteResult = await users.findOneAndDelete({ _id: new ObjectId("5a86978929ed740ca87e5c31")});
  console.log('Deleted users =>', JSON.stringify(deleteResult, undefined, 2));
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
