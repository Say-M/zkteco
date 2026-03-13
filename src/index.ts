import { Hono } from "hono";
import { parseAttendanceLog } from "./utils";

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

  const result = parseAttendanceLog(body);
  
  console.log(result);

  return c.text("OK");
});

app.get("/iclock/getrequest", (c) => {
  return c.text("OK");
});

app.post("/iclock/devicecmd", async (c) => {
  const sn = c.req.query("SN");
  const rawBody = await c.req.text();

  console.log(`--- [COMMAND RESPONSE] Device: ${sn} ---`);

  // 1. Parse the body (ID=101&Return=0)
  // We can use URLSearchParams to handle this format easily
  const params = new URLSearchParams(rawBody);
  const commandId = params.get("ID");
  const returnCode = params.get("Return");

  // 2. Interpret the return code
  // 0 = Success, negative values usually mean error/unsupported
  if (returnCode === "0") {
    console.log(
      `✅ SUCCESS: Command [${commandId}] was executed by the device.`,
    );
  } else {
    console.log(
      `❌ FAILED: Command [${commandId}] failed with code: ${returnCode}`,
    );
  }

  // 3. The device MUST receive "OK" to stop retrying the report
  return c.text("OK", 200, {
    "Content-Type": "text/plain",
    Connection: "close",
  });
});

app.get("/", (c) => {
  return c.text("Hello World");
});

export default {
  port: 8000,
  fetch: app.fetch,
};
