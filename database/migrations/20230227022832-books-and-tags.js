'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.createTable('books_tags', {
    'book_id': {
      type: 'int',
      foreignKey: {
        name: 'book_id_fk',
        table: 'books',
        mapping: 'id',
        rules: {},
      },
      primaryKey: true,
    },
    'tag_name': {
      type: 'string',
      foreignKey: {
        name: 'tag_name_fk',
        table: 'tags',
        mapping: 'name',
        rules: {},
      },
      primaryKey: true,
    },
  });

  await db.insert('books_tags', ['book_id', 'tag_name'], [1, 'children']);
  await db.insert('books_tags', ['book_id', 'tag_name'], [1, 'short_story']);

  await db.insert('books_tags', ['book_id', 'tag_name'], [2, 'self_help']);
  await db.insert('books_tags', ['book_id', 'tag_name'], [2, 'culinary']);

  await db.insert('books_tags', ['book_id', 'tag_name'], [3, 'children']);
  await db.insert('books_tags', ['book_id', 'tag_name'], [3, 'comic']);
};

exports.down = function (db) {
  return db.dropTable('book_tags');
};

exports._meta = {
  "version": 1
};
