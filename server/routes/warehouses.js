const express = require("express");

const Warehouse = require("../sequelize/models/warehouse");
const router = express.Router();

router.get("/", (request, response) => {
  Warehouse.findAll()
    .then(data => response.json(data))
    .catch(error => response.send(error));
});

router.post("/", (request, response) => {
  const { id, address } = request.body;

  Warehouse.create({ id, address })
    .then(data => response.send(data))
    .catch(error => response.send(error));
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const { address } = request.body;

  Warehouse.update({ address }, { where: { id } })
    .then(data => response.send(data))
    .catch(error => response.send(error));
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  Warehouse.destroy({ where: { id } })
    .then(() => response.sendStatus(204))
    .catch(error => response.send(error));
});

module.exports = router;
