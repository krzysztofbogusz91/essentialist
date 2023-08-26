import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import bodyParser from "body-parser";
import userController from "./controller/user.controller";
const app = express();

app.use(bodyParser.json());

app.post("/users/new", userController.createUser);

app.post("/users/edit/:userId", userController.updateUser);

app.get("/users", userController.getUserByEmail);

app.get("/users/all", userController.getAllUsers);

export { app };
