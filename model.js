const { query } = require('express');
const { Client } = require('pg');
require('dotenv').config();

class Model {
  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: 'postgres',
      password: '12345',
      port: 5432,
    });
  }

  async init() {
    await this.client.connect();
  }

  async setup(storeJson) {
    await this.client.query(`
      CREATE TABLE IF NOT EXISTS public.stores
      (
          id SERIAL NOT NULL,
          name text,
          url text,
          district text,
          CONSTRAINT stores_pkey PRIMARY KEY (id)
      );
    `);

    await this.client.query(`
      ALTER TABLE IF EXISTS public.stores OWNER to postgres;
    `);

    for (const store of storeJson) {
      const checkForStore = await this.client.query(`
        SELECT * FROM public.stores
        WHERE
         name = $1
        LIMIT 1
      `, [store.name]);

      console.log(checkForStore.rows);

      if (checkForStore.rows.length === 0) {
        await this.client.query(`
          INSERT INTO public.stores (name, url, district)
          VALUES ($1, $2, $3)
        `, [store.name, store.url, store.district]);
      }
    }
  }

  async getAllStores() {
    const res = await this.client.query('SELECT * FROM public.stores');
    return res.rows;
  }

 async getStoresWithUrl() {
    const res = await this.client.query(`SELECT * FROM public.stores WHERE url IS NOT NULL`);
    return res.rows;
 } 

  async getStore(id) {
    const res = await this.client.query(`SELECT * FROM public.stores WHERE id = ${id}`);
    return res.rows;
  }

  async getStoreBySearch(search) {
    const res = await this.client.query(`SELECT * FROM public.stores WHERE name LIKE '%${search}%'`);
    return res.rows;
  }

  async getStoresInDistrict(district) {

    let query = "";

    if(district == "null") {
      query = `SELECT * FROM public.stores WHERE district IS NULL`
    } else {
      query = `SELECT * FROM public.stores WHERE district = '${district}'`
    }

    const res = await this.client.query(query);
    return res.rows;
  }

}

module.exports = Model;
