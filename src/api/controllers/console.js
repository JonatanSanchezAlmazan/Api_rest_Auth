const Console = require("../models/console");

const postConsole = async(req, res, next) => {
    try {
        const newConsole = new Console({
            name: req.body.name,
            imgUrl: req.body.imgUrl,
            price: req.body.price,
            videogames: req.body.videogames

        });
        const { name } = req.body;
        const consoleDuplicated = await Console.findOne({ name });
        if (consoleDuplicated) {
            return res.status(400).json("Consola ya existente");
        }
        const consoleSaved = await newConsole.save();
        return res.status(200).json(consoleSaved);
    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}

const getAllConsole = async(req, res, next) => {
    try {
        const allConsole = await Console.find().populate("videogames");
        return res.status(200).json(allConsole);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error en la petición");
    }
}

const getConsoleById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const console = await Console.findById(id).populate("videogames");
        return res.status(200).json(console);

    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}

const updateConsole = async(req, res, next) => {
    try {
        const { id } = req.params;
        const oldConsole = await Console.findById(id);
        const updateConsole = new Console(req.body);
        updateConsole._id = id;
        updateConsole.videogames = [...oldConsole.videogames, ...updateConsole.videogames];
        const update = await Console.findByIdAndUpdate(id, updateConsole, { new: true });

        return res.status(200).json(update);
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al actualizar la Consola");
    }
}

const deleteConsole = async(req, res, next) => {
    try {
        const { id } = req.params;
        const consoleDeleted = await Console.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Consola eliminada correctamente",
            consoleDeleted
        });

    } catch (error) {
        return res.status(400).json("Error al eliminar la consola");
    }
}



module.exports = { postConsole, getAllConsole, getConsoleById, updateConsole, deleteConsole }