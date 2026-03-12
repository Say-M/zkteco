import { Hono } from "hono"

const app = new Hono()

app.post("/iclock/cdata", async (c) => {
  const sn = c.req.query("SN")
  const body = await c.req.text()

  console.log("Device SN:", sn)
  console.log("Raw Logs:", body)

  return c.text("OK")
})

app.get("/iclock/getrequest", (c) => {
  return c.text("OK")
})

console.log(app.);


export default {
  port: 8000,
  fetch: app.fetch
}