import passport from "passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from "../models/User.js";

export default passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        },
        async (jwt_payload, done) => {
            try {
                let user = await User.findOne({_id:jwt_payload.id})
                if(user) {
                    user.password = null;
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error, false)
            }
        }
    )
)