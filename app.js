import express from "express";
import itemsRouter from "./routes/itemsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import producersRouter from "./routes/producersRouter.js";

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", `${process.cwd()}/views`);

app.use(express.urlencoded());

app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/producers", producersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
