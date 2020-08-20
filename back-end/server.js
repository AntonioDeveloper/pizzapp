const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../../backend/clients.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3002;

server.use(middlewares);
server.use(router);
if (!router) {
  console.log("ERRO")
} else {
  console.log("Ok")
}
server.listen(port, () => {
  console.log(`JSON Server is running in ${port}`);
})