import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignUp } from '../middlewares/auth/accountExistSignUp.middleware.js';
import { accountExistsSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVirified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import passport from '../middlewares/passport.js';

const { signup, signin, signout, token } = authController;

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

router.post('/signout', passport.authenticate('jwt', { session: false }), signout)

router.post('/token', passport.authenticate('jwt', { session: false}), token)

export default router