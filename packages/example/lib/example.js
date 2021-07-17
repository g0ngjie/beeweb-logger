"use strict";

module.exports = example;
const logger = require("@beeweb/logger");
const schema = require("@beeweb/logger-schema");

function example() {
  logger.mount(schema.createSchema({ a: 1 }));
  console.log("[debug]1123123:", 11231231);
}

example();
