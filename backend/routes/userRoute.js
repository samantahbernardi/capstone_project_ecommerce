import express from 'express';
import { userLogin,userSignup,adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register',userSignup)
userRouter.post('/login',userLogin)
userRouter.post('/admin',adminLogin)

export default userRouter;