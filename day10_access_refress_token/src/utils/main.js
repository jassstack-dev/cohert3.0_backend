import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const createAccessRefressToken =async ({userId})=>{

    const accessToken = await jwt.sign({userId }, config().access_key, {expiresIn: '15m'})
    const refreshToken = await jwt.sign({userId}, config().refress_key, {expiresIn: '7d'})



    return {
        accessToken, refreshToken
    }

}

export const loginAccessRefreeToken =async ()=>{

    try {
        
    } catch (error) {
        console.log('error in login authentication', error)
    }

}