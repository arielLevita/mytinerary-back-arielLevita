import express from 'express';
import userController from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.js';
import { createUserSchema, updateUserSchema } from '../schema/user.schema.js';
import passport from '../middlewares/passport.js';

const router = express.Router();
const {getUsers, createUser, updateUser, deleteUser} = userController;

router.get('/', getUsers);
router.post('/', validator(createUserSchema), createUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), validator(updateUserSchema), updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

export default router