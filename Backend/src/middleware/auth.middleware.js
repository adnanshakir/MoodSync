const blackListModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const redis = require("../config/cache");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  const isTokenBlacklisted = await redis.get(token)

  if(isTokenBlacklisted){
    return res.status(401).json({
      message: "Token is invalid",
    });
  }

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = { authUser };
