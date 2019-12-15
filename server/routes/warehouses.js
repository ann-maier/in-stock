const express = require("express");

const pool = require("../database/sql/mysql-config");
const router = express.Router();

router.get("/", (request, response) => {
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
      response.status(500).send(error);
    });
});

router.post("/", (request, response) => {
  const { id, address } = request.body;

  const query = `INSERT INTO warehouses (id, address) VALUES (${id}, '${address}');`;

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
  const { address } = request.body;

  const query = `UPDATE warehouses SET address = '${address}' WHERE id = ${id};`;

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
  const query = `DELETE FROM warehouses WHERE id = ${id};`;

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
