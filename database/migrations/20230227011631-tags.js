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
  await db.createTable('tags', {
    name: { type: 'string', primaryKey: true },
    description: 'string',
  });

  await db.insert('tags', ['name', 'description'], ['children', 'Children books']);
  await db.insert('tags', ['name', 'description'], ['adult', 'Adult books']);
  await db.insert('tags', ['name', 'description'], ['self_help', 'Self-help books']);
  await db.insert('tags', ['name', 'description'], ['general', 'General books']);
  await db.insert('tags', ['name', 'description'], ['short_story', 'Short stories']);
  await db.insert('tags', ['name', 'description'], ['culinary', 'Cooking guide and recipes']);
  await db.insert('tags', ['name', 'description'], ['comic', 'Comic books']);
};

exports.down = function (db) {
  return db.dropTable('tags');
};

exports._meta = {
  "version": 1
};
