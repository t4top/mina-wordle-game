import Koa from "koa";
import cors from "@koa/cors";
import router from "./router.js";

// set server listen port. Default is 3000
const DEFAULT_PORT: number = 3000;
const port = process.env.PORT || DEFAULT_PORT;

const app = new Koa();
app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

  // start listening for incoming requests
  .listen(port);

console.log(`server listening on port ${port}`);
