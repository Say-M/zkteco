import { Hono } from "hono";

const app = new Hono();

app.get("/iclock/cdata", async (c) => {
  const sn = c.req.query("SN");
  const table = c.req.query("table");

  console.log("Device SN:", sn);
  console.log("Table:", table);

  return c.text("OK");
});

app.post("/iclock/cdata", async (c) => {
  const sn = c.req.query("SN");
  const body = await c.req.text();

  console.log("Device SN:", sn);
  console.log("Raw Logs:", body);

  return c.text("OK");
});

app.get("/iclock/getrequest", (c) => {
  return c.text("OK");
});

app.get("/", (c) => {
  return c.text("Hello World");
});

export default {
  port: 8000,
  fetch: app.fetch,
};
