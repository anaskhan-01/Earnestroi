import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db, writeDB } from "./db";

export const register = (req: Request, res: Response) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!email || !password || !confirmPassword || !name) {
    return res.status(400).send("Missing fields");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters");
  }

  if (db[email]) {
    return res.status(400).send("Email already exists");
  }

  db[email] = {
    name,
    password: bcrypt.hashSync(password, 10),
  };

  writeDB();
  res.send("Register");
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing fields");
  }

  if (!db[email]) {
    return res.status(400).send("Email does not exist");
  }

  if (!bcrypt.compareSync(password, db[email].password)) {
    return res.status(400).send("Invalid password");
  }

  res.send("Login");
};

export const getDB = (req: Request, res: Response) => {
  res.send(db);
};
