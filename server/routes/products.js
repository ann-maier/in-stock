const express = require('express');
const fs = require('fs');

const pool = require('../database/sql/mysql-config');
const router = express.Router();

router.get('/', (request, response) => {
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

router.post('/', (request, response) => {
  const { type, title, price } = request.body;

  fs.readFile('database/products.json', (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);
    console.log(parsedData.products);
    let lastId = parsedData.products.reduce((lastId, { productId }) => {
      if (lastId < productId) {
        lastId = productId;
      }
      return lastId;
    }, 0);

    parsedData.products.push({ productId: lastId + 1, type, title, price });

    fs.writeFile(
      'database/products.json',
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
      response.status(500).send({
        message: error
      });
    });
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  const { type, title, price } = request.body;

  fs.readFile('database/products.json', (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);

    parsedData.products = parsedData.products.map(product => {
      if (+product.productId === +id) {
        product.type = type;
        product.title = title;
        product.price = price;
      }

      return product;
    });

    fs.writeFile(
      'database/products.json',
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
  const { type, title, price } = request.body;

  fs.readFile("database/products.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);

    parsedData.products = parsedData.products.map(product => {
      if (+product.productId === +id) {
        product.type = type;
        product.title = title;
        product.price = price;
      }

      return product;
    });

    fs.writeFile("database/products.json", JSON.stringify(parsedData), (error) => {
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
