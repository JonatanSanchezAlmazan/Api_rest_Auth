const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { getAllConsole, postConsole, getConsoleById, updateConsole, deleteConsole } = require("../controllers/console");

const consoleRoutes = require("express").Router();

consoleRoutes.post("/register", postConsole);
consoleRoutes.get("/", isAuth, getAllConsole);
consoleRoutes.get("/:id", isAuth, getConsoleById);
consoleRoutes.put("/:id", isAdmin, updateConsole);
consoleRoutes.delete("/:id", isAdmin, deleteConsole);


module.exports = consoleRoutes;