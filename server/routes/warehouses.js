const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (request, response) => {
  fs.readFile("database/warehouses.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    response.status(200).send(JSON.parse(data));
  });
});

router.post("/", (request, response) => {
  const { address } = request.body;

  fs.readFile("database/warehouses.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);
    let lastId = parsedData.warehouses.reduce((lastId, { warehouseId }) => {
      if (lastId < warehouseId) {
        lastId = warehouseId;
      }

      return lastId;
    }, 0);

    parsedData.warehouses.push({ warehouseId: lastId + 1, address });

    fs.writeFile("database/warehouses.json", JSON.stringify(parsedData), (error) => {
      if (error) {
        response.status(404).json({
          error
        });
      }
      response.status(200).send();
    });
  });
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  fs.readFile("database/warehouses.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);

    parsedData.warehouses = parsedData.warehouses.filter(({ warehouseId }) => +warehouseId !== +id);

    fs.writeFile("database/warehouses.json", JSON.stringify(parsedData), (error) => {
      if (error) {
        response.status(404).json({
          error
        });
      }
      response.status(200).send();
    });
  });
});

module.exports = router;
