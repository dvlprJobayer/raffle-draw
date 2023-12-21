const router = require("express").Router();
const db = require("../db/db");

router
    .route("/t/:ticketId")
    .get((req, res) => {
        const { ticketId } = req.params;
        const ticket = db.findById(ticketId);
        res.status(200).json(ticket);
    })
    .patch((req, res) => {
        const { ticketId } = req.params;
        const ticketBody = req.body;

        const ticket = db.updateById(ticketId, ticketBody);
        res.status(200).json(ticket);
    })
    .delete((req, res) => {
        const { ticketId } = req.params;
        db.deleteById(ticketId);
        res.status(203).send();
    });

router
    .route("/u/:username")
    .get((req, res) => {
        const { username } = req.params;
        const tickets = db.findByUserName(username);
        res.status(200).json(tickets);
    })
    .patch((req, res) => {
        const { username } = req.params;
        const ticketBody = req.body;

        const tickets = db.updateByUsername(username, ticketBody);
        res.status(200).json(tickets);
    })
    .delete((req, res) => {
        const { username } = req.params;

        db.deleteByUsername(username);
        res.status(203).send();
    });

router.post("/sell", (req, res) => {
    const { userName } = req.body;
    const ticket = db.create(userName);
    res.status(201).json(ticket);
});
router.post("/bulk", (req, res) => {
    const { userName, quantity } = req.body;
    const tickets = db.bulkCreate(userName, quantity);
    res.status(201).json(tickets);
});

router.get("/draw", (req, res) => {
    winnerCount = req.query.wc ?? 3;
    const winners = db.draw(winnerCount);
    res.status(200).json(winners);
});

router.get("", (_req, res) => {
    const tickets = db.find();
    res.status(200).json(tickets);
});

module.exports = router;
