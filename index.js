const express = require("express");
const ModelClass = require("./data_access_layer/model.js");
const app = express();
let Model = null;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

let p = __dirname + '/public/static'
console.log(p)

app.use(express.static(p))

app.set('view engine', 'pug')

app.set('views', __dirname + '/public/views')

app.get("/setup", async (req, res) => {
  await Model.setup();
  res.json({ success: true });
});

app.get("/", (req, res) => { 
  res.render('index', { title: 'Hey', message: 'Hello there!'})
})

app.use("/discover/:search", (req, res, next) => {
  var search = req.params.search;
  app.locals.search = search;
  res.redirect(`/discover`)
})

app.get("/discover", async(req, res) => { 
  Model.getAllStores().then((stores) => {
    var search = app.locals.search;
    app.locals.search = null;
    res.stores = stores
    res.render('discover', {stores: stores, search: search})
  })
})

app.get("/storeSearch/:search", async (req, res) => {
  console.log("backend", req.params.search)
  const stores = await Model.getStoreBySearch(req.params.search);
  res.json(stores);
});


app.get("/stores", async (req, res) => {
  const stores = await Model.getAllStores();
  res.json(stores);
});

app.delete("/store/:id", async (req, res) => {
  console.log(req.params.id)
  console.log("deleting")
  await Model.deleteStore(req.params.id);
  res.json({ success: true });
});

app.post("/addStore", async (req, res) => {
  console.log(req.body)
  await Model.addStore(req.body.name, req.body.url, req.body.district, req.body.storeType);
  res.status(204).end();
});

app.post("/editStore", async (req, res) => {
  console.log(req.body)
  await Model.updateStore(req.body.id, req.body.name, req.body.url, req.body.district, req.body.storeType);
  res.status(204).end();
});

const startServer = async () => {
  Model = new ModelClass();
  await Model.init();
  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
};

startServer();
