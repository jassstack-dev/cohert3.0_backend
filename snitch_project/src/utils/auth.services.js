import jwt from "jsonwebtoken";
import config from "../config/config.js";


export const createAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, config.ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  return accessToken
};


export const createRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, config.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return refreshToken
};

