const jwt = require("jsonwebtoken")
const User = require("../models/User")

const verifyToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
       
        console.log(authorization)
        if (!authorization) return res.status(403).send({ info: "Usuario no autenticado", success: false })

        const decode = jwt.verify(JSON.parse(authorization), process.env.JWT_ACC_ACTIVATE)
        req.userID = decode.id


        const user = await User.findById(req.userID)
        if (!user) return res.status(400).send({ info: "Usuario no encontrado", success: false })

        next()

    } catch(err) {
         console.log(err)
        res.status(401).send({ info: "Token invalido", success: false })
    }
}

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userID)
    user.admin === true ? next() : res.status(400).send({ info: "El usuario no es administrador", success: false })
}



module.exports = { verifyToken, isAdmin }