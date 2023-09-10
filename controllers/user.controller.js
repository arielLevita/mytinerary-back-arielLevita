import User from "../models/User.js";

const controller = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
                // .populate('itinerary');
            if(users.length > 0) {   
                return res.status(200).json({
                    success: true,
                    users: users
                })
            }
            return res.status(404).json({
                succes: false,
                message: 'There are no users'
            })
        } catch (error) {
            next(error)
        }
    },
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'User generated'
            });
        } catch (error) {
            console.log(error).json({
                success: false,
                message: 'Failed to create user'
            })
        }
    },
    updateUser: async(req, res) => {
        try {
            await User.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({
                success: true,
                message: 'User updated successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to update the User'
            })
        }
    },
    deleteUser: async(req, res) => {
        try {
            await User.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to delete the User'
            })
        }
    },
}

export default controller;