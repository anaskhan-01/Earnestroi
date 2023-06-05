import express, { Request, Response } from "express";
import { getDB, login, register } from "./controller";
import { readDB } from "./db";

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// controllers
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.post("/register", register);
app.post("/login", login);
app.get("/db", getDB);

app.listen(3000, async () => {
  readDB();
  console.log("Example app listening on port 3000!");
});
