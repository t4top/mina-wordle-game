import Router from "@koa/router";
import { getHandler } from "./routes/wordle.js";

const router = new Router();

router.prefix("/wordle");
router.get("/", getHandler);                            // responds to "/wordle"
router.get("/:date(\\d{4}-\\d{2}-\\d{2})", getHandler); // responds to "/wordle/2022-11-30"

export default router;
