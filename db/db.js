const Ticket = require("../models/Ticket");

class MyDB {
    constructor() {
        this.tickets = [
            {
                id: "random-id",
                name: "Rand User",
                price: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }

    /**
     * Create Ticket
     * @param {string} userName
     * @returns {Ticket}
     */
    create(userName) {
        const ticket = new Ticket(userName);
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * Bulk Create
     * @param {string} userName
     * @param {number} count
     * @returns {Array<Ticket>}
     */
    bulkCreate(userName, quantity) {
        const result = [];
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(userName);
            result.push(ticket);
        }

        return result;
    }

    /**
     * Get All Tickets
     * @returns {Array<Ticket>}
     */
    find() {
        return this.tickets;
    }

    /**
     * Get Single Ticket
     * @param {string} ticketId
     * @returns {Ticket}
     */
    findById(ticketId) {
        return this.tickets.find((ticket) => ticket.id === ticketId);
    }

    /**
     * Get Tickets by username
     * @param {string} userName
     * @returns {Array<Ticket>}
     */
    findByUserName(userName) {
        return this.tickets.filter((ticket) => ticket.name === userName);
    }

    /**
     * Update Ticket By Id
     * @param {string} ticketId
     * @param {{userName: string}} ticketBody
     * @returns {Ticket}
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
        ticket.name = ticketBody.userName ?? ticket.name;
        return ticket;
    }

    /**
     * Update Ticket by Username
     * @param {string} userName
     * @param {{userName: string}} ticketBody
     * @returns {Array<Ticket>}
     */
    updateByUsername(userName, ticketBody) {
        const tickets = this.tickets.filter(
            (ticket) => ticket.name === userName
        );
        for (const ticket of tickets) {
            ticket.name = ticketBody.userName ?? ticket.name;
        }
        return tickets;
    }

    /**
     * Delete Ticket by Id
     * @param {string} ticketId
     * @returns {boolean}
     */
    deleteById(ticketId) {
        const idx = this.tickets.findIndex((ticket) => ticket.id === ticketId);
        if (idx === -1) {
            return false;
        } else {
            this.tickets.splice(idx, 1);
            return true;
        }
    }

    /**
     * Delete Tickets by Username
     * @param {string} userName
     * @returns {boolean}
     */
    deleteByUsername(userName) {
        const remainingTickets = this.tickets.filter(
            (ticket) => ticket.name !== userName
        );
        if (remainingTickets) {
            this.tickets = remainingTickets;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Raffle draw Fn
     * @param {number} winnerCount
     * @returns {Array<Ticket>}
     */
    draw(winnerCount) {
        const indexes = [];

        for (let i = 0; i < winnerCount; i++) {
            let index = Math.floor(Math.random() * this.tickets.length);

            while (indexes.includes(index)) {
                index = Math.floor(Math.random() * this.tickets.length);
            }

            indexes.push(index);
        }

        const winners = indexes.map((index) => this.tickets[index]);

        return winners;
    }
}

const myDB = new MyDB();

module.exports = myDB;
