const { v4: uuid } = require("uuid");

class Ticket {
    constructor(userName) {
        this.id = uuid();
        this.name = userName;
        this.price = 10;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = Ticket;
