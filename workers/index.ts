import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

app.use("/static/*", serveStatic());

export default app;
