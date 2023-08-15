import User from "../models/User.js";

const controller = {
    getUsers: (req, res) => {
        res.json({
            user: "Ariel Levita",
            email: "levita.ariel@gmail.com"
        });
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