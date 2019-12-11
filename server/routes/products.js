const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (request, response) => {
  fs.readFile("database/products.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    response.status(200).send(JSON.parse(data));
  });
});

router.post("/", (request, response) => {
  const { type, title, price } = request.body;

  fs.readFile("database/products.json", (error, data) => {
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

router.delete("/:id", (request, response) => {
  const id = request.params.id;

  fs.readFile("database/products.json", (error, data) => {
    if (error) {
      response.status(404).json({
        error
      });
    }

    const parsedData = JSON.parse(data);

    parsedData.products = parsedData.products.filter(({ productId }) => +productId !== +id);

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
