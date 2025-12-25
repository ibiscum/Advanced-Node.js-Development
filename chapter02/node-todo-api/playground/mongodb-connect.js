import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://admin:your_strong_password@localhost:27017/');

const dbName = 'TodoApp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('connected successfully to server');

  const db = client.db(dbName);
  const todos = db.collection('Todos');

  let insertResult = await todos.insertOne({
    text: 'Something to do',
    completed: false
  })
  console.log('Inserted one todo =>', insertResult);

  const users = db.collection('Users');

  insertResult = await users.insertOne(
    {
      name: 'Andrew',
      age: 25,
      location: 'Philadelphia'
    }
  );

  console.log('Inserted one user =>', insertResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

