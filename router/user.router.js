import express from 'express';
import userController from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.js';
import { createUserSchema, updateUserSchema } from '../schema/user.schema.js';

const router = express.Router();
const {getUsers, createUser, updateUser, deleteUser} = userController;

router.get('/', getUsers);
router.post('/', validator(createUserSchema), createUser);
router.put('/:id', validator(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router