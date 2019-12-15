const express = require("express");

const pool = require("../database/sql/mysql-config");
const router = express.Router();

router.get("/", (request, response) => {
  const query = `SELECT * FROM products_in_stock`;

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

router.post("/", (request, response) => {
  const { id, warehouseId, productId, dateArrived, dateSent } = request.body;

  const query = `
  INSERT INTO products_in_stock (id, id_warehouse, id_product, date_arrived, date_sent) 
  VALUES (${id}, ${warehouseId}, ${productId}, '${dateArrived}', '${dateSent}');`;

  const promise = new Promise((resolve, reject) => {
    pool.query(query, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });

  return promise
    .then(() => {
      response.send();
    })
    .catch(error => {
      response.status(500).send(error);
    });
});

router.put("/:id", (request, response) => {
  const id = request.params.id;
  const { warehouseId, productId, dateArrived, dateSent } = request.body;

  const query = `UPDATE products_in_stock 
  SET id_warehouse = ${warehouseId}, id_product = ${productId}, date_arrived = '${dateArrived}', date_sent = '${dateSent}' 
  WHERE id = ${id};`;

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
      response.status(500).send(error);
    });
});

router.delete("/:id", (request, response) => {
  const id = request.params.id;
  const query = `DELETE FROM products_in_stock WHERE id = ${id};`;

  const promise = new Promise((resolve, reject) => {
    pool.query(query, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });

  return promise
    .then(() => {
      response.send();
    })
    .catch(error => {
      response.status(500).send(error);
    });
});

module.exports = router;
