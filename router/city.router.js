import express from 'express';
import cityController from '../controllers/city.controller.js';

const router = express.Router();

router.get('/', cityController.getCities)

router.post('/', cityController.createCity)

export default router