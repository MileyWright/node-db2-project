
exports.up = function(knex) {
  return knex.schema.createTable('cars', cars => {
      // id
      cars.increments();
      //vin number
      cars.integer('VIN')
      .notNullable()
      .unique();
      // the make
      cars.string('make', 128)
      .notNullable();
      // the model
      cars.string('model', 128)
      .notNullable();
      // mileage
      cars.decimal('mileage')
      .notNullable();
      //transmission type
      cars.string('transmission_type', 128);
      // title status
      cars.string('title_status', 128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
