import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import { verify } from '../helpers/google-verify.js'

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
                    photo: user.photo,
                    google: user.google
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
                        photo: user.photo,
                        google: user.google
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

    googleSignIn: async (req, res, next) => {

        const {token_id} = req.body

        try {
            const {name, email, photo} = await verify(token_id)
            
            let user = await User.findOne({email});
            if(!user) {
                const data = {
                    name,
                    email,
                    photo,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASSWORD, 12),
                    google: true,
                    verified_code: crypto.randomBytes(12).toString('hex')
                }
                
                user = await User.create(data)
            }
            
            user.online = true;
            await user.save()
            
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
                
                res.status(200).json({
                    success: true,
                    message: 'User logged in with Google',
                    response: {
                        token,
                        user: {
                            name: user.name,
                            email: user.email,
                            photo: user.photo
                        },
                    }
                })
            } catch (error) {
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