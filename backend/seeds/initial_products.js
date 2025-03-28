exports.seed = async function (knex) {
    await knex("products").del();
  
    await knex("products").insert([
      {
        id: 1,
        name: "T-Shirt 'Prototype Club'",
        description: "Schwarzes Shirt mit Logo",
        price: 19.99,
        image_url: "https://placehold.co/150x150?text=Shirt"
      },

      {
        id: 2,
        name: "Sticker Pack",
        description: "10 coole Sticker zum Kleben",
        price: 4.99,
        image_url: "https://placehold.co/150x150?text=Shirt"
      },
      {
        id: 3,
        name: "Handgemachter Schlüsselanhänger",
        description: "Von Julian selbst gebastelt 😉",
        price: 6.49,
        image_url: "https://placehold.co/150x150?text=Shirt"
      }
    ]);
  };
  