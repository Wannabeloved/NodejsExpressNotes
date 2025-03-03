const http = require("http");
const chalk = require("chalk");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(PORT, () =>
  console.log(chalk.green(`Server is running on http://localhost:${PORT}`))
);
