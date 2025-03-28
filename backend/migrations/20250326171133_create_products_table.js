exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.string('image_url');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };
  