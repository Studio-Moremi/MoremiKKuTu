const { clientId, clientSecret } = require("../auth.json");

function discordLogin(req, res) {
  const redirectUri = "http://localhost:3000/login";
  const userId = `discord-${Math.floor(Math.random() * 100000)}`; // Mock user ID
  res.send(`Logged in as: ${userId}`);
}

module.exports = { discordLogin };
