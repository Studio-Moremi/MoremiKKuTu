const express = require('express');
const passport = require('../auth/discord');
const router = express.Router();

const session = require('cookie-session');
router.use(
  session({
    name: 'discord-auth',
    keys: ['your_secret_key'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get(
  '/login/discord',
  passport.authenticate('discord')
);

router.get(
  '/login/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    const userID = req.user.id;
    console.log(`discord-${userID}가 portal에 입장했습니다.`);
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;