import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Function to verify auth token
const protectRoute = async (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token) {
      return res.json({ success: false, message: "Unauthorized User" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const getUser = await User.findById(verifyToken.userId).select("-password");

    if (!getUser) {
      return res.json({ success: false, message: "User Not Found" });
    }

    req.user = getUser;
    next();
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default protectRoute;
