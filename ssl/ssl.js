const fs = require("fs");
const https = require("https");
const sslConfig = require("./ssl.json");

function setup(app) {
  if (sslConfig.SSL) {
    const options = {
      key: fs.readFileSync(sslConfig.Key),
      cert: fs.readFileSync(sslConfig.Cert),
    };

    if (sslConfig.IsCA) {
      options.ca = fs.readFileSync(sslConfig.CA);
    }

    https.createServer(options, app).listen(443, () => {
      console.log("SSL-secured server is running on port 443");
    });
  } else {
    console.log("SSL is disabled");
  }
}

module.exports = { setup };
