import jwt from "jsonwebtoken"
import User from "../models/User"

export const verifyToken = async (req, res, next) => {
    try {
        const {authorization} = req.headers
        if (!authorization) return res.status(403).send({info:"Usuario no autenticado", success: false})

        const decode = jwt.verify(authorization, process.env.JWT_ACC_ACTIVATE)
        req.userID = decode.id

        const user = await User.findById(req.userID)
        if (!user) return res.status(400).send({info:"Usuario no encontrado", success: false})

        next()
    } catch {
        res.status(401).send({info:"Token invalido", success: false})
    }
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userID)
    user.admin === true ? next() : res.status(400).send({info:"El usuario no es administrador", success: false}) 
}