import express from 'express';
import userRouter from './user.router.js';
import cityRouter from './city.router.js';
import commentRouter from './comment.router.js';
import itineraryRouter from './itinerary.router.js';
import authRouter from './auth.router.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World')
});

router.use('/users', userRouter);

router.use('/cities', cityRouter);

router.use('/comments', commentRouter);

router.use('/itineraries', itineraryRouter);

router.use('/auth', authRouter);

export default router;