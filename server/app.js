import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status-codes";
import cors from "cors";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { shouldSendSameSiteNone } from "should-send-same-site-none";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: (origin, callback) => callback(null, true),

  maxAge: 3600,
  methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"],
};

export const app = express();

app.disable("x-powered-by");

app.set("trust proxy", true);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(shouldSendSameSiteNone);

app.use(
  "/",
  express.static("dist", {
    dotfiles: "deny",
    extensions: ["html"],
    setHeaders: (res) =>
      res.set(
        "Cache-Control",
        "max-age=60, stale-while-revalidate=604800, stale-if-error=604800",
      ),
  }),
);
app.all("*", (req, res) => {
  // Вы можете настроить 404 страницу по своему усмотрению
  res.sendFile(join(__dirname, "..", "dist/index.html"));

  // Логирование запроса, который не найден
  console.log(`${req.method} ${req.url} not found`);
});

app.use(async (err, req, res) => {
  console.error(
    `Error ${err.name} ${err.message} during request handling: ${JSON.stringify(
      {
        method: req.method,
        hostname: req.hostname,
        url: req.url,
        query: req.query,
        params: req.params,
        headers: req.headers,
      },
    )}\n ${err.stack}`,
  );

  res.sendStatus(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
});
