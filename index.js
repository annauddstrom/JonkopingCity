const express = require('express')
const ModelClass = require('./model.js');
const storeJson = require('./stores.json');
const app = express()
let Model = null;

app.get('/setup', async (req, res) => {
  await Model.setup(storeJson);
  res.json({success: true});
});

app.get('/store/:id', async(req, res) => {
  //add digit check {TODO}
  const store = await Model.getStore(req.params.id)
  res.json(store)
})

app.get('/storesWithUrl', async(req, res) => {
  const stores = await Model.getStoresWithUrl()
  res.json(stores)
})

app.get('/storeSearch/:search', async(req, res) => { 
  const stores = await Model.getStoreBySearch(req.params.search)
  res.json(stores)
})

app.get('/storeDistrict/:district', async(req, res) => {
  //check legit district {TODO}
  const stores = await Model.getStoresInDistrict(req.params.district)
  res.json(stores)
})

app.get('/storeName/:name', async(req, res) => {
  //check legit district {TODO}
  const storeName = await Model.getStoreName(req.params.name)
  res.json(storeName)
})

app.get('/stores', async (req, res) => {
  const stores = await Model.getAllStores();
  res.json(stores);
})

const startServer = async () => {
  Model = new ModelClass();
  await Model.init();
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

startServer();
