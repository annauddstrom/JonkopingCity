const { query } = require('express');
const { Client } = require('pg');
require('dotenv').config();
const setup = require('./setup.js');

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

  async setup() {
    await setup(this.client)
  }

  async getAllStores() {
    const res = await this.client.query('SELECT * FROM public.stores');
    return res.rows;
  }

  async getStore(id) {
    const res = await this.client.query(`SELECT * FROM public.stores WHERE id = ${id}`);
    return res.rows;
  }

  async getStoreName(name) {
    const res = await this.client.query(`SELECT * FROM public.stores WHERE name = '${name}'`);
    
    return res.rows;
  }

  async getStoreType(storeType) {
    const res = await this.client.query(`SELECT * FROM public.stores WHERE storeType = '${storeType}'`);
    
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
