exports.up = function (knex) {
    return knex.schema.createTable("orders", function (table) {
      table.increments("id").primary();
      table.string("user_email").notNullable();
      table.json("items").notNullable();
      table.decimal("total", 10, 2).notNullable();
      table.string("status").defaultTo("Offen");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("orders");
  };
  