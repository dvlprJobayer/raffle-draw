const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

module.exports = [morgan("dev"), cors(), express.json()];
