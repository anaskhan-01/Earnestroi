import fs from "fs";

export let db: Record<string, Record<"name" | "password", string>> = {};

// read data from db.json file
export const readDB = () => {
  const dbJson = fs.readFileSync("./db.json");
  db = JSON.parse(dbJson.toString());
};

// write data to db.json file

export const writeDB = () => {
  const fs = require("fs");
  fs.writeFileSync("./db.json", JSON.stringify(db));
  readDB();
};
