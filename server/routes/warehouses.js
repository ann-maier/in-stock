const express = require('express');
const fs = require('fs');

const pool = require('../database/sql/mysql-config');
const router = express.Router();

router.get('/', (request, response) => {
  const query = `SELECT * FROM warehouses`;

  const promise = new Promise((resolve, reject) => {
    pool.query(query, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });

  return promise
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message: error
      });
    });
});

router.post('/', (request, response) => {
  const { address } = request.body;

  fs.readFile('database/warehouses.json', (error, data) => {
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

    fs.writeFile(
      'database/warehouses.json',
      JSON.stringify(parsedData),
      error => {
        if (error) {
          response.status(404).json({
            error
          });
        }
        response.status(200).send();
      }
    );
  });
});

router.delete('/:id', (request, response) => {
  const id = request.params.id;

  fs.readFile('database/warehouses.json', (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);

    parsedData.warehouses = parsedData.warehouses.filter(
      ({ warehouseId }) => +warehouseId !== +id
    );

    fs.writeFile(
      'database/warehouses.json',
      JSON.stringify(parsedData),
      error => {
        if (error) {
          response.status(404).json({
            error
          });
        }
        response.status(200).send();
      }
    );
  });
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const { address } = request.body;

  fs.readFile("database/warehouses.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);

    parsedData.warehouses = parsedData.warehouses.map(warehouse => {
      if (+warehouse.warehouseId === +id) {
        warehouse.address = address;
      }

      return warehouse;
    });

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
