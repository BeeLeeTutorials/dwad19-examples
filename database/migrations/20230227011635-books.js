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
  await db.createTable('books', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    pages: 'int',
  });

  await db.insert('books', ['id', 'name', 'pages'], [1, 'Book ABC', 100]);
  await db.insert('books', ['id', 'name', 'pages'], [2, 'How to cook', 58]);
  await db.insert('books', ['id', 'name', 'pages'], [3, 'Adventures of Tintin', 87]);
};

exports.down = function (db) {
  return db.dropTable('books');
};

exports._meta = {
  "version": 1
};
