import User from "../models/User.js";

const controller = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
                .populate('itinerary');
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
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Getting Users error'
            })
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
    deleteUser: () => {},
}

export default controller;