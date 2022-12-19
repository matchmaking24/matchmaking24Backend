

const express = require('express')
const { RegisterUser, getAlluser, getSingleUser, updateUser, deleteUser } = require('../controler/userControler')

const userRoute = express.Router()

userRoute.post('/register',RegisterUser);
userRoute.get(`/get-all-user`,getAlluser);
userRoute.get(`/get-single-user`,getSingleUser);
userRoute.put(`/update-user`,updateUser);
userRoute.delete(`/delete-user`,deleteUser);

module.exports = userRoute;  