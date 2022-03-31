const express = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', updateUserInfo);

exports.userRoutes = userRoutes;
