const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { registerUser, loginUser, deleteUser, getAllUsers, getUserById, updateUser } = require("../controllers/user");

const usersRoutes = require("express").Router();
usersRoutes.post("/register", registerUser);
usersRoutes.post("/login", loginUser);
usersRoutes.get("/", isAdmin, getAllUsers);
usersRoutes.get("/:id", isAdmin, getUserById);
usersRoutes.put("/:id", isAuth, updateUser);
usersRoutes.delete("/:id", isAdmin, deleteUser);
module.exports = usersRoutes;