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

module.exports = router;
