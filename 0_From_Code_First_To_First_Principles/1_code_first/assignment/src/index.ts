import { AppDataSource } from "./data-source";
import "./app";

import { app } from "./app";
const port = 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server listening on port ", port);
    });
  })
  .catch((error) => console.log(error));
