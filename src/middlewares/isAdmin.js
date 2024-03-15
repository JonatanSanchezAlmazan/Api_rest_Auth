const User = require("../api/models/user");
const usersRoutes = require("../api/routes/user");
const { verifyJwt } = require("../config/jwt");



const isAdmin = async(req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json("No estas autorizado");
        }
        const [, modifiedToken] = token.split(" ");
        const { id } = verifyJwt(modifiedToken);
        const user = await User.findById(id);
        if (user.rol === "admin") {
            usersRoutes.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json("No puedes realizar esta acción");
        }

    } catch (error) {

        return res.status(400).json("No estas autorizado");
    }
}

module.exports = { isAdmin }