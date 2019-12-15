const express = require("express");

const pool = require("../database/sql/mysql-config");
const router = express.Router();

router.get("/", (request, response) => {
  const query = `SELECT * FROM products`;

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
  const { id, type, title, price } = request.body;

  const query = `
  INSERT INTO products (id, type, name, price) VALUES (${id}, '${type}', '${title}', '${price}');`;

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
  const { type, title, price } = request.body;

  const query = `
  UPDATE products SET type = '${type}', name = '${title}', price = ${price} WHERE id = ${id};`;

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
  const query = `DELETE FROM products WHERE id = ${id};`;

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
