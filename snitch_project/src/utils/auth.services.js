import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const createAccessToken = (userId, role) => {
  const accessToken = jwt.sign({ userId, role}, config.ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  return accessToken;
};

export const createRefreshToken = (userId, role) => {
  const refreshToken = jwt.sign({ userId, role }, config.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return refreshToken;
};

export const compareRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      config.REFRESH_TOKEN
    );

    return decoded;
  } catch (error) {
    return null;
  }
};

export const readGetMe = async (token)=>{
  try {

    const decoded = jwt.verify(token, config.ACCESS_TOKEN)

  return decoded
    
  } catch (error) {
    console.log('erro0r in the read accesstoken', error)
    
  }

  
}