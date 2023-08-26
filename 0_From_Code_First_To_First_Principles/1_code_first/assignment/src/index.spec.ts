import request from "supertest";
import { app } from "./app";
import { DataSource } from "typeorm";
import { AppDataSource } from "./data-source";

describe("Integration", () => {
  describe("User API", () => {
    let connection: DataSource;

    beforeAll(async () => {
      // cannot use separate db instance
      // - should we modify this source with tests enviroment vars ?
      connection = AppDataSource;

      // Not working
      // new DataSource({
      //   type: "postgres",
      //   host: "localhost",
      //   port: 5432,
      //   username: "admin",
      //   password: "admin",
      //   database: "postgres",
      //   synchronize: true,
      //   logging: false,
      //   entities: [User],
      //   migrations: [],
      //   subscribers: [],
      // });

      await connection.initialize().then(async () => {
        console.log("Server started");
      });
    });

    afterAll(async () => {
      await connection.destroy();
    });

    it("should create a new user", async () => {
      // Jest has detected the following 1 open handle potentially keeping Jest from exiting:
      const username = "test" + Math.random();
      const email = "test@example.com" + Math.random();
      const res = await request(app).post("/users/new").send({
        username,
        email,
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.email).toEqual(email);
    });
  });
});
