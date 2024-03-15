const Videogame = require("../models/videogame");

const postVideogame = async(req, res, next) => {
    try {

        const newVideogame = new Videogame({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            frontPage: req.body.frontPage,
            price: req.body.price,

        });
        const { name } = req.body;
        const videoGameDuplcated = await Videogame.findOne({ name });
        if (videoGameDuplcated) {
            return res.status(400).json("Videojuego ya existente");
        }
        const videogameSaved = await newVideogame.save();
        return res.status(200).json(videogameSaved);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error en la petición");
    }
}

const getAllVideogames = async(req, res, next) => {
    try {
        const allVideogames = await Videogame.find();
        return res.status(200).json(allVideogames);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error en la petición");
    }
}

const getVideogameById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const videogame = await Videogame.findById(id);
        return res.status(200).json(videogame);
    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}
const updateVideogame = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updateVideogame = new Videogame(req.body);
        updateVideogame._id = id;
        const update = await Videogame.findByIdAndUpdate(id, updateVideogame, { new: true });
        return res.status(200).json(update);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al actualizar el videojuego");
    }
}

const deleteVideogame = async(req, res, next) => {
    try {
        const { id } = req.params;
        const videogameDeleted = await Videogame.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Videojuego eliminado correctamente",
            videogameDeleted
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al eliminar el videojuego");
    }
}
module.exports = { postVideogame, getAllVideogames, getVideogameById, updateVideogame, deleteVideogame }