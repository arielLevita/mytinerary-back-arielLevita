import express from 'express';
import cityControler from '../controllers/city.controller.js';

const router = express.Router();

router.get('/', cityControler, getCity)

router.post('/', cityControler, createCity)

export default router