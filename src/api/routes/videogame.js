const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { postVideogame, getAllVideogames, getVideogameById, updateVideogame, deleteVideogame } = require("../controllers/videogame");

const videogamesRoutes = require("express").Router();

videogamesRoutes.post("/register", postVideogame);
videogamesRoutes.get("/", getAllVideogames);
videogamesRoutes.get("/:id", getVideogameById);
videogamesRoutes.put("/:id", isAdmin, updateVideogame);
videogamesRoutes.delete("/:id", isAdmin, deleteVideogame);

module.exports = videogamesRoutes;