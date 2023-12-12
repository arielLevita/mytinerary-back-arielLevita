import Comment from '../models/Comment.js';

const controller = {
    getComments: async (req, res) => {
        try {
            const { itineraryId } = req.query;
            const query = itineraryId ? { itinerary: itineraryId } : null;

            const comments = await Comment.find(query)
                .populate('user', 'name email photo')
                .populate('itinerary', '_id');

            if (comments.length > 0) {
                return res.status(200).json({
                    success: true,
                    comments: comments
                })
            }
            return res.status(200).json({
                succes: true,
                comments: []
            })
        } catch (error) {
            next(error)
        }
    },
    getCommentById: async (req, res) => {
        try {
            const commentId = req.params.id;
            const comment = await Comment.findById(commentId)
                .populate('user', 'name')
                .populate('itinerary', '_id');
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.json({ comment });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    createComment: async (req, res) => {
        try {
            const { text, itineraryId, userId } = req.body;

            const newComment = await Comment.create({
                text,
                itinerary: itineraryId,
                user: userId,
            });
            return res.status(201).json({
                success: true,
                message: 'Comment generated'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Failed to create Comment'
            })
        }
    },
    updateComment: async (req, res) => {
        try {
            await Comment.updateOne({ _id: req.params.id }, req.body)
            return res.status(200).json({
                success: true,
                message: 'Comment updated successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to update the Comment'
            })
        }
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                success: true,
                message: 'Comment deleted successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to delete the Comment'
            })
        }
    },
}

export default controller;