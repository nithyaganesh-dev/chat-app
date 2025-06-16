import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.util.js";

// Controller fuction for signup
export const signup = async (req, res) => {
  const { email, fullName, password, bio } = req.body;

  try {
    if (!email || !fullName || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.json({ success: false, message: "Account Already Exists" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in database
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    // Generate auth token
    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      authToken: token,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Controller fuction for login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const getUser = await User.findOne({ email });

    const isPasswordMatch = await bcrypt.compare(password, getUser.password);

    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    // Generate auth token
    const token = generateToken(getUser._id);

    res.json({
      success: true,
      userData: getUser,
      authToken: token,
      message: "Login Successful",
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Controller function to check if user is authenticated
export const checkAuth = async (req, res) => {
  res.json({ success: true, userData: req.user });
};
