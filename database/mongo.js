const { MongoClient } = require('mongodb');

const connectionUri = "mongodb://localhost";
const client = new MongoClient(connectionUri);

async function main() {
  // Need to wait for a valid connection to mongo first
  await client.connect();
  const db = client.db('library');
  const booksCollection = db.collection('books');
  const tagsCollection = db.collection('tags');

  // Clear them out so the past execution does not pollute our current execution
  await booksCollection.drop();
  await tagsCollection.drop();

  const { insertedIds } = await tagsCollection.insertMany([
    { name: 'children' }, // 0
    { name: 'adult' }, // 1
    { name: 'self_help' }, // 2
    { name: 'general' }, // 3
    { name: 'short_story' }, // 4
    { name: 'culinary' }, // 5
    { name: 'comic' }, // 6
  ]);

  await booksCollection.insertMany([
    {
      name: 'Book ABC',
      tags: [insertedIds[0], insertedIds[4]],
      pages: 100,
    },

    {
      name: 'How to cook',
      tags: [insertedIds[3], insertedIds[5]],
      pages: 58,
    },

    {
      name: 'Adventures of Tintin',
      tags: [insertedIds[0], insertedIds[6]],
      pages: 87,
    },
  ]);

  const childrenTag = await tagsCollection.findOne({ name: 'children' });

  await booksCollection.find({ tags: childrenTag._id }).forEach(book => {
    console.log(`Name: ${book.name} - Number of pages: ${book.pages}`);
  });
}

main().then(
  () => process.exit(0),
)
