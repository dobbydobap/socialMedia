import express from "express";
import { SignIn, signUp } from "../controllers/auth.contollers.js";

const authRouter = express.Router();

authRouter.post('/signup',signUp)
authRouter.post('/signin',SignIn)
export default authRouter;

