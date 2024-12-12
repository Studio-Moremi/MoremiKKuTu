const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/chart-data', async (req, res) => {
    const { user_id, type } = req.query;
    if (!user_id || !type) {
        return res.status(400).json({ error: 'User ID and chart type are required' });
    }

    try {
        const result = await db.getChartData(user_id);
        const values = type === 'win' ? result.winRates : result.loseRates;
        const labels = result.labels;
        res.json({ labels, values });
    } catch (err) {
        console.error('Error fetching chart data:', err);
        res.status(500).json({ error: 'Failed to fetch chart data' });
    }
});

module.exports = router;
