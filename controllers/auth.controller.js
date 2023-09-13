import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';

const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(12).toString('hex')
            req.body.password = bcryptjs.hashSync(req.body.password, 12);

            const user = await User.create(req.body)

            return res.status(201).json({
                success: true,
                message: 'User registered!'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'User registration failure'
            })
        }
    },

    signin: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    photo: user.photo
                },
                process.env.SECRET,
                { expiresIn: '6h'}
            )

            user.password = null;

            return res.status(200).json({
                success: true,
                message: 'User logged in',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo
                    },
                }
            })
        } catch {
            res.status(500).json({
                success: false,
                message: 'User autentication failure'
            })
        }
    },

    signout: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                {email: req.user.email},
                {online: false},
                {new: true}
            )
            return res.status(200).json({
                success: true,
                message: 'Logout complete'
            })
        } catch {
            res.status(500).json({
                success: false,
                message: 'User logout failure'
            })
        }
    },

    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                // token,
                user: {
                    name: user.name,
                    email: user.email,
                    photo: user.photo
                },
            })
        } catch (error) {
            next(error)
        }
    }
}

export default controller;