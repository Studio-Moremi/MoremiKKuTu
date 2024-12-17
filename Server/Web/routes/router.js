const express = require("express");
const db = require("../db");
const router = express.Router();

router.get('/user/level', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const level = await db.getUserLevel(req.user.discordId); // SQLite3 DB 모듈 사용
        res.json({ level });
    } catch (error) {
        console.error('Error fetching user level:', error); // 에러 로그 출력
        res.status(500).json({ error: 'Failed to fetch user level' }); // 에러 메시지 반환
    }
});

module.exports = router;