
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, vin: 'KMHGN41EMFU058646', make: 'Hyundai', model: 'Genesis', mileage: '5481', transmission_type: 'Automatic', title_status: ''},
        {id: 2, vin: '1FA6P8NF4K5144678', make: 'Ford', model: 'Mustang', mileage: '3102', transmission_type: 'Automatic', title_status: ''},
        {id: 3, vin: 'JM0GL103300400730', make: 'Mazda', model: '6 Touring GL', mileage: '2007', transmission_type: 'Automatic', title_status: ''},
      ]);
    });
};
