const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { getUserByUsername, createUser } = require('../db');  // DB 관련 함수 호출

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: '아이디가 존재하지 않습니다.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: '아이디 또는 비밀번호가 맞지 않습니다.' });
    }

    res.redirect('http://localhost:3000');  // 로그인 성공 후 리다이렉트
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (username.length < 5 || username.length > 20) {
    return res.status(400).json({ error: '아이디는 5자 이상, 20자 이하로 작성해주세요.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: '비밀번호는 최소 8자 이상이어야 합니다.' });
  }

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: '아이디가 이미 존재합니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
