const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((userData) => {
      res.status(200).send(userData);
    })
    .catch(next);
};
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.boby;
  User.findByIdAndUpdate(req.user._id, { email, name })
    .then((newUserData) => {
      res.status(200).send(newUserData);
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
