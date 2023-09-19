require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./src/api/config/db");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});

const userRoutes = require("./src/api/routes/userRoutes");
app.use("/users", userRoutes);
const articleRoutes = require("./src/api/routes/articleRoutes");
app.use("/articles", articleRoutes);

main = () => {
  app.listen(port, () => {
    console.log(`port: ${port}`);
  });
};

main();
