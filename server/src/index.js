import { app } from "./app.js";
import connectDB from "./db/index.js";
import "./config.js";

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is runnig at port : ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server ", err);
  });
