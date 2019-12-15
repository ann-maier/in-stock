const express = require("express");

const DatabaseQueries = require("../database/utils/database-queries");
const pool = require("../database/sql/mysql-config");
const router = express.Router();

router.get("/", (request, response) => {
  const query = DatabaseQueries.getDataFromTable("products");

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

  const query = DatabaseQueries.insertIntoTableValues("products", {
    id,
    type: `"${type}"`,
    name: `"${title}"`,
    price: `"${price}"`
  });

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

  const query = DatabaseQueries.updateTableValues("products", id, {
    id,
    type: `"${type}"`,
    name: `"${title}"`,
    price: `"${price}"`
  });

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
  const query = DatabaseQueries.deleteValueFromTable("products", id);

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
