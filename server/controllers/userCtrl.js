const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, email, mobile, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !mobile || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Create a new user instance
    user = new UserModel({
      name,
      email,
      mobile,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const loginController = async (req, res) => {
  try {
    // Login logic here
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: "2h",
    // });
    // res.status(200).send({ message: "Login Success", success: true, token });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
const alluser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  registerController,
  loginController,
  alluser,
};
