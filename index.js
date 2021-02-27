const lib = require("./lib");
const os = require("os");
const path = require("path");
const fs = require("fs");
const http = require("http");

console.log(lib);
console.log('directory', __dirname);
console.log('file     ', __filename);
console.log('arguments', process.argv);
console.log('uptime   ', os.uptime());
console.log('cpu      ', os.cpus().length);
console.log('user     ', os.userInfo());
console.log('system   ', os.version());

const stylePath = path.resolve(__dirname, "./src/style.css");
fs.writeFileSync(stylePath, `body {background: #ff0}`);

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'src', req.url == '/' ? 'index.html' : req.url); ;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("ERROR", err);
      res.writeHead(404);
      res.end();
      return;
    }
    res.end(data);
  });
});

server.listen(4200, () => {
  console.log("server has started listening on port 4200");
});
