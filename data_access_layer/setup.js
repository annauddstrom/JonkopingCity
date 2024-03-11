const storeJson = require("./stores.json");
const { query } = require('express');


async function setup(client) {
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.stores
      (
          id SERIAL NOT NULL,
          name text,
          url text,
          district text,
          storeType text,
          CONSTRAINT stores_pkey PRIMARY KEY (id)
      );
    `);

    await client.query(`
      ALTER TABLE IF EXISTS public.stores OWNER to postgres;
    `);

    for (const store of storeJson) {
      const checkForStore = await client.query(`
        SELECT * FROM public.stores
        WHERE
         name = $1
        LIMIT 1
      `, [store.name]);

      console.log(checkForStore.rows);

      if (checkForStore.rows.length === 0) {
        await client.query(`
          INSERT INTO public.stores (name, url, district, storeType)
          VALUES ($1, $2, $3, $4)
        `, [store.name, store.url, store.district, store.storeType]);
      }
    }
  }

module.exports = setup;