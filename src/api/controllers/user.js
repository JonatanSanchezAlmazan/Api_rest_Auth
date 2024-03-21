const { generateSign } = require("../../config/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async(req, res, next) => {
    try {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            imageProfile: req.body.imageProfile,
            favoriteGame: req.body.favoriteGame,
            rol: req.body.rol || "user"
        });
        const { email } = req.body;
        const userDuplicated = await User.findOne({ email });
        if (userDuplicated) {
            return res.status(400).json("Usuario ya existente");
        }

        const userSaved = await newUser.save()
        return res.status(200).json(userSaved);
    } catch (error) {
        return res.status(400).json("Error al registrarse")
    }
}

const loginUser = async(req, res, next) => {
    try {

        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            if (bcrypt.compareSync(password, userExist.password)) {
                const token = generateSign(userExist._id);
                return res.status(200).json({ userExist, token })
            } else {
                return res.status(400).json("Usario o contraseña incorrecto");
            }
        } else {
            return res.status(400).json("Usario o contraseña incorrecto");
        }

    } catch (error) {
        console.log("Error al logearse");
    }
}

const getAllUsers = async(req, res, next) => {
    try {

        const allUsers = await User.find().populate("favoriteGame").select("-password -email");
        return res.status(200).json(allUsers);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error en la petición");
    }

}

const getUserById = async(req, res, next) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id).populate("favoriteGame").select("-password -email");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}

const updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const oldUser = await User.findById(id);
        const updateUser = new User(req.body);
        updateUser._id = id;
        updateUser.favoriteGame = [...oldUser.favoriteGame, ...updateUser.favoriteGame];
        const update = await User.findByIdAndUpdate(id, updateUser, { new: true });
        return res.status(200).json(update);

    } catch (error) {
        return res.status(400).json("Error al actualizar el usuario");
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Usuario eliminado correctamente",
            userDeleted
        });

    } catch (error) {
        return res.status(400).json("Error al eliminar el usuario");
    }
}

module.exports = { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser }