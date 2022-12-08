import Koa from "koa";

// set server listen port. Default is 3000
const DEFAULT_PORT: number = 3000;
const port = process.env.PORT || DEFAULT_PORT;

const app = new Koa();

// start listening for incoming requests
console.log(`server listening of port ${port}`);
app.listen(port);
