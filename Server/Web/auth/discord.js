const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

const ClientID = 'your_client_id';
const ClientSecret = 'your_client_secret';
const CALLBACK_URL = 'http://localhost:3000/login/discord/callback';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: ClientID,
      clientSecret: ClientSecret,
      callbackURL: CALLBACK_URL,
      scope: ['identify'],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = passport;
