import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();
const {getUsers, createUser, updateUser, deleteUser} = userController;

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router