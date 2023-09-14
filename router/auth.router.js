import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignUp } from '../middlewares/auth/accountExistSignUp.middleware.js';
import { accountExistsSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVirified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import passport from '../middlewares/passport.js';
import { validator } from '../middlewares/validator.js';
import { userSignIn, userSignUp } from '../schema/user.schema.js';

const { signup, signin, signout, token, googleSignIn } = authController;

const router = express.Router();

router.post('/signup',
    validator(userSignUp),
    accountExistsSignUp,
    signup)

router.post('/signin',
    validator(userSignIn),
    accountExistsSignIn,
    accountHasBeenVerified,
    passwordIsOk,
    signin)

router.post('/google', googleSignIn)

router.post('/signout', passport.authenticate('jwt', { session: false }), signout)

router.post('/token', passport.authenticate('jwt', { session: false}), token)

export default router