import userModel from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/auth.services.js";

export const registrController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const isEmail = await userModel.findOne({ email });

    if (isEmail) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "user created successfully",
      data: {
        email: user.email,
        name: user.name,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
