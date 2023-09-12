import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignUp } from '../middlewares/auth/accountExistSignUp.middleware.js';
import { accountExistsSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVirified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import passport from '../middlewares/passport.js';

const { signup, signin, signout } = authController;

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

router.post('/signuot', passport.authenticate('jwt', { session: false }), signout)

export default router