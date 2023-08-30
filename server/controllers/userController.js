const User = require("../model/UserM.js");

const userController = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userController,
};
