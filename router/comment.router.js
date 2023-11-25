import express from 'express';
import commentController from '../controllers/comment.controller.js';

const router = express.Router();
const {getComments, createComment, getCommentById, updateComment, deleteComment} = commentController;

router.get('/', getComments);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router