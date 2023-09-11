import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignUp } from '../middlewares/auth/accountExistSignUp.middleware.js';
import { accountExistsSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVirified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';

const { signup, signin } = authController;

const router = express.Router();

router.post('/signup',
    /* validator(validatorSignUpUser), */
    accountExistsSignUp,
    signup)

router.post('/signin',
    /* validator(validatorSignInUser), */
    accountExistsSignIn,
    accountHasBeenVerified,
    passwordIsOk,
    signin)

export default router