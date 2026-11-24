import userModel from "../model/auth.model.js";
import { readGetMe } from "../utils/auth.services.js";

export const getMeMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
  return res.status(401).json({
    success: false,
    message: "Access token is required",
  });
}

    const decoded = await readGetMe(accessToken);

    console.log("Decoded:", decoded.userId);

    if (!decoded) {
      return res.status(400).json({
        message: "invalid or expired token",
      });
    }

    const { userId, role } = decoded;

    console.log("decoded userId", userId);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error in the get me middleware", error);
  }
};
