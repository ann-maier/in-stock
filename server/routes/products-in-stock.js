const express = require('express');
const pool = require('../database/sql/mysql-config');

const router = express.Router();

router.get('/', (request, response) => {
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

module.exports = router;
