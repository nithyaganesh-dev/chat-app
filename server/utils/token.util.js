import jwt from "jsonwebtoken";

// Function to generate a auth token
const generateToken = (userId) => {
  const token = jwt.sign(userId, process.env.JWT_SECRET);
  return token;
};

export default generateToken;
