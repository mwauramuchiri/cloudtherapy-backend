const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5005;
// const server = http.createServer(app);

// server.listen(PORT);

app.listen(PORT, () => {
  console.log('CLOUD THERAPY APP STARTED 👇🏿');
  console.log('\n', 'http://localhost:' + PORT, '\n');
  console.log('=========================');
})