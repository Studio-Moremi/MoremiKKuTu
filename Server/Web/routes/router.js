const express = require("express");
const db = require("../db");
const router = express.Router();

router.get('/user/level', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ erorr: "Unauthorized" });
    }

    try {
        const level = await db.getUserLevel(req.user.discordId);
        res.json({ level });
    } catch (erorr) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user level '});
    }
});

module.exports = router;