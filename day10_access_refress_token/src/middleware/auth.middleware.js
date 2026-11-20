
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token missing'
            })
        }

        const accessToken = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            accessToken,
            config().access_key
        )

        req.user = decoded.userId

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authorization failed. Please login again'
        })
    }
}

export default authMiddleware
