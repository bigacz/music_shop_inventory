import express from "express";
import itemsRouter from "./routes/itemsRouter.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", `${process.cwd()}/views`);

app.use(express.urlencoded());

app.use("/items", itemsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
