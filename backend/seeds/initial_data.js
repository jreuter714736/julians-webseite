/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Bestehende Daten löschen
  await knex('products').del();
  await knex('users').del();

  // Users einfügen
  const [user1] = await knex('users')
    .insert({
      name: 'Jonathan',
      email: 'jonathan@example.com',
      password: '$2b$10$hBrBxHTvnzVkFf6dQVuQGeP0rDRFXDLhAYr3iXN8FgE.0AP9OtUtW', // bcrypt für "pass123"
      is_admin: true
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
