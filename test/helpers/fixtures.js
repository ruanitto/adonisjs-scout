'use strict'

module.exports = {
  setupTables (db) {
    const tables = [
      db.schema.createTable('stubs', function (table) {
        table.increments()
        table.string('title')
        table.timestamps()
        table.timestamp('deleted_at').nullable()
      })
    ]
    return Promise.all(tables)
  },
  dropTables (db) {
    const tables = [
      db.schema.dropTable('stubs')
    ]
    return Promise.all(tables)
  }
}
