const knex = require('knex')({
  client: 'mysql',
  connection: {
    user: 'root',
    password: 'root',
    database: 'library',
  },
})
const bookshelf = require('bookshelf')(knex);

const Book = bookshelf.model('Book', {
  tableName: 'books',
  tags() {
    return this.belongsToMany('Tag', 'books_tags', 'book_id')
  },
});

const Tag = bookshelf.model('Tag', {
  tableName: 'tags',
  idAttribute: 'name',
  books() {
    // Join by books_tags table, reference by setting `tag_name` = Tag.name
    return this.belongsToMany('Book', 'books_tags', 'tag_name')
  },
});

async function main() {
  // fetch children books
  const tags = await Tag.where({ 'name': 'children' }).fetch({ withRelated: ['books'] });
  console.log(tags.related('books').toJSON());
}

main().then(() => process.exit(0));