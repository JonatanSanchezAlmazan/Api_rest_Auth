require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRoutes = require("./src/api/routes/user");
const consoleRoutes = require("./src/api/routes/console");
const videogamesRoutes = require("./src/api/routes/videogame");

const app = express();
connectDB();
app.use(express.json());
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/consoles", consoleRoutes);
app.use("/api/v1/videogames", videogamesRoutes);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
});

app.listen(3000, () => {
    console.log("Servidor escuchando en: http://localhost:3000");
})