const express = require('express');
const { saveNickname, isNicknameAvailable } = require('../db');
const router = express.Router();

router.post('/set-nickname', async (req, res) => {
  const { userId, nickname } = req.body;

  if (!/^[가-힣a-zA-Z0-9]{1,10}$/.test(nickname)) {
    return res.status(400).json({ error: '닉네임이 올바르지 않습니다.' });
  }

  try {
    const available = await isNicknameAvailable(nickname);
    if (!available) {
      return res.status(400).json({ error: '이미 사용 중인 닉네임입니다.' });
    }

    await saveNickname(userId, nickname);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in /set-nickname:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;