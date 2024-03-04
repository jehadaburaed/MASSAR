const UserModel = require("../model/user.model");
var jwt = require('jsonwebtoken');

exports.auth = function(accessRoles) {
  return async function(req, res, next) {
    try {
      var tokenLogin = "secret";
      var token = req.headers.token;

      if (!token) {
        return res.status(400).json({ message: "Invalid token" });
      }

      var decoded = jwt.verify(token, tokenLogin);
      console.log(decoded, token);
      if (!decoded || !decoded._id) {

        return res.status(400).json({ message: "Invalid authorization token payload" });
      }

      const user= await UserModel.findById(decoded._id );
        console.log(user);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // if (!accessRoles.includes(user.role)) {
        //   return res.status(403).json({ message: "Not authorized to access this resource" });
        // }

        req.user = user;
        next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error during authentication" });
    }
  };
};