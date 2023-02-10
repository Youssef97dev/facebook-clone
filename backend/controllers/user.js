const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    // Distruct data from request body
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
      verified,
    } = req.body;

    // Check uf email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email adress",
      });
    }

    // Check if email is not exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "This email already exists, try another one !",
      });
    }

    // Check if firstname length is valid
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "firstname must be between 3 and 30 characters !",
      });
    }

    // Check if lastname length is valid
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "lastname must be between 3 and 30 characters !",
      });
    }

    // Check if password length is valid
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be between 3 and 40 characters !",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    console.log(cryptedPassword);

    // create and validate username
    let tempUsername = first_name + last_name;
    const newUsername = await validateUsername(tempUsername);

    // insert data into model and save it to database
    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
      verified,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    // tOKEN for registred
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  const check = await User.findById(user.id);
  if (check.verified) {
    return res
      .status(400)
      .json({ message: "this email is already activated !" });
  } else {
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: "Account has been activated successfuly" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email adress you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    // tOKEN for login
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login Success !",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
