const express = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUserData } = require('../middlewares/validations');

const userRoutes = express.Router();

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', validateUserData, updateUserInfo);

exports.userRoutes = userRoutes;
