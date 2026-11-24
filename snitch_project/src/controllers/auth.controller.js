import userModel from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import {
  compareRefreshToken,
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

    const accessToken = createAccessToken(
     user._id,
    user.role,
    );
    const refreshToken = createRefreshToken(
      user._id,
      user.role,
    );

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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "invalid email",
      });
    }

    const hashPassword = await bcrypt.compare(password, user.password);

    if (!hashPassword) {
      return res.status(400).json({
        message: "password is wrong",
      });
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "user logged in successfully",
      data: {
        email: user.email,
        name: user.name,
      },
      accessToken,
    });
  } catch (error) {
    console.log("error in the login api", error);
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    // Verify refresh token
    const decoded = compareRefreshToken(refreshToken);
    

    if (!decoded) {
      return res.status(401).json({
        message: "Please login again",
      });
    }

    const { userId, role } = decoded;



    // Find user using token payload
    const user = await userModel.findById(userId);



    // Compare database token with cookie token
    if (user.refreshToken !== refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });

      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const accessToken = createAccessToken(
     user._id,
    user.role
    );

    const newRefreshToken = createRefreshToken(
    user._id,
      user.role
    )

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken : newRefreshToken
    })

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly:true
    })



    return res.status(200).json({
      success: true,
      message: "Access token generated",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error in the refresh token controller',
    });
  }
};

export const getMeController = async (req,res)=>{
  try {

    const user = req.user

    if(!user){
      return res.status(400).json({
        message: 'user not found'
      })
    }


    res.status(200).json({
      message: ' user found successfully', 
      data: {
        name: user.name,
        email : user.email,
        role:user.role
      }
    })
    
  } catch (error) {
    consoel.log('erron in the get middleware', error)
    
  }
}
