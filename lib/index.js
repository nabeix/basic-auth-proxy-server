const http = require("http");
const httpProxy = require("http-proxy");
const basicAuth = require("basic-auth");

module.exports = () => {
  const port = process.argv[2];
  const target = process.argv[3];
  const auth = process.argv[4];

  if (!(target && port && auth)) {
    console.log("Usage: basic-auth-proxy-server <port> <backend> <auth>");
    console.log(" - port       : port for proxy server e.g. 8000");
    console.log(" - backend    : proxy target address e.g. http://localhost:3000");
    console.log(" - auth       : {user}:{password} e.g. tom:12341234");
    process.exit(1);
  }

  const proxy = httpProxy.createProxyServer();

  http.createServer((req, res) => {
    const [name, password] = auth.split(":");
    const credential = basicAuth(req);

    if (!(credential && credential.name === name && credential.pass === password)) {
      res.writeHead(401, {
        "WWW-Authenticate": "Basic realm=\"secret zone\""
      });
      res.end("Access denied");
    } else {
      proxy.web(req, res, { target });
    }
  }).listen(port);
};
