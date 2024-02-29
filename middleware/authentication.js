const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  // console.log("token : ", token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    // console.log("Payload : ", payload);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    // console.log("Error error error");
    throw new UnauthenticatedError("Authenticated invalid");
  }
};
module.exports = auth;
