const express = require("express");

const Product = require("../sequelize/models/product");
const router = express.Router();

router.get("/", (request, response) => {
  Product.findAll()
    .then(data => response.json(data))
    .catch(error => response.send(error));
});

router.post("/", (request, response) => {
  const { id, type, title, price } = request.body;

  Product.create({ id, type, name: title, price })
    .then(data => response.send(data))
    .catch(error => response.send(error));
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const { type, title, price } = request.body;

  Product.update({ type, name: title, price }, { where: { id } })
    .then(data => response.send(data))
    .catch(error => response.send(error));
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  Product.destroy({ where: { id } })
    .then(() => response.sendStatus(204))
    .catch(error => response.send(error));
});

module.exports = router;
