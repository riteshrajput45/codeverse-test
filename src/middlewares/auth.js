const jwt = require('jsonwebtoken');
const User = require('../model/User');
const globalCalls = require('../utils/globalCalls')

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.split(' ')[1];
    if (!token) return globalCalls.badRequest(res,"Unauthorized")
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return globalCalls.badRequest(res,"Unauthorized");
    req.user = user;
    next();
  } catch (err) {
    return globalCalls.badRequest(res,"Invalid token")
  }
}

function permit(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return globalCalls.badRequest(res,"Forbidden");
    next();
  };
}

module.exports = { auth, permit };
