exports.seed = async function (knex) {
    await knex("orders").del();
  
    await knex("orders").insert([
      {
        id: 1,
        user_email: "jonathan@example.com",
        items: JSON.stringify([
          { id: 1, name: "T-Shirt 'Prototype Club'", quantity: 1, price: 19.99 },
          { id: 2, name: "Sticker Pack", quantity: 2, price: 4.99 }
        ]),
        total: 29.97,
        status: "Offen"
      },
      {
        id: 2,
        user_email: "viola@example.com",
        items: JSON.stringify([
          { id: 3, name: "Handgemachter Schlüsselanhänger", quantity: 3, price: 6.49 }
        ]),
        total: 19.47,
        status: "Versendet"
      }
    ]);
  };
  