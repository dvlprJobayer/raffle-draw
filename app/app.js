require("dotenv").config("../.env");
const express = require("express");

const app = express();

const myDB = require("../db/db");

myDB.create("User 1");
myDB.create("User 2");
myDB.create("User 3");
myDB.create("User 4");
myDB.bulkCreate("User 5", 5);

myDB.updateByUsername("User 5", { userName: "User 9" });

const delByUsername = myDB.deleteByUsername("User 9");
// console.log("deleteItem", delByUsername);

const allTicket = myDB.find();
// console.log("allTicket", allTicket);

const ticketByUsername = myDB.findByUserName("User 1");
// console.log("Ticket By Username", ticketByUsername);

// const winners = myDB.draw(2);
// console.log("winners", winners);

app.use(require("./middleware"));

app.use(require("./routes"));

app.use(require("./error"));

module.exports = app;
