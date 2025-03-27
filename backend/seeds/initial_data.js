const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Bestehende Daten löschen
  await knex('products').del();
  await knex('users').del();

  // Passwörter hashen
  const passwordJonathan = await bcrypt.hash('P@sswort123', 10);
  const passwordViola = await bcrypt.hash('Passwort456', 10);
  const passwordFlorian = await bcrypt.hash('Geheim789', 10);

  // Users einfügen
  const [user1] = await knex('users')
    .insert({
      name: 'Jonathan',
      email: 'jonathan@example.com',
      password: passwordJonathan,
      is_admin: true
    })
    .returning('*');

  const [user2] = await knex('users')
    .insert({
      name: 'Viola',
      email: 'viola@example.com',
      password: passwordViola
    })
    .returning('*');

  const [user3] = await knex('users')
    .insert({
      name: 'Florian',
      email: 'florian@example.com',
      password: passwordFlorian
    })
    .returning('*');

  // Produkte einfügen
  await knex('products').insert([
    {
      title: 'Selbstgemachtes Armband',
      description: 'Handgemacht mit Liebe',
      price: 12.99,
      image_url: 'https://example.com/image1.jpg',
      user_id: user1.id
    },
    {
      title: 'Design-Postkarte',
      description: 'Individuelles Motiv auf Recyclingpapier',
      price: 2.50,
      image_url: 'https://example.com/image2.jpg',
      user_id: user1.id
    }
  ]);
};
