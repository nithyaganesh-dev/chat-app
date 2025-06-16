import Message from "../models/Message.model.js";
import User from "../models/User.model.js";

// Get all the users except the logged in user
export const getUsersForSidebar = async (req, res) => {
  const userId = req.user;

  try {
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // Count no of messages not seen
    let unseenMessages = {};

    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await promises.al;
  } catch (error) {}
};
