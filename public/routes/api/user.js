const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/user", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "로그인이 필요합니다." });
    }

    const query = "SELECT nickname, level FROM users WHERE id = $1";
    const { rows } = await db.query(query, [userId]);

    if (rows.length > 0) {
      res.status(200).json({ success: true, user: rows[0] });
    } else {
      res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
