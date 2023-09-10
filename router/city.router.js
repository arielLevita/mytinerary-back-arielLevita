import express from 'express';
import cityController from '../controllers/city.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';

const router = express.Router();
const {getCities, createCity, getCityById, updateCity, deleteCity} = cityController;

router.get('/', getCities);
router.get('/:id', getCityById);
router.post('/', isAdmin, createCity);
router.put('/:id', isAdmin, updateCity);
router.delete('/:id', isAdmin, deleteCity);

export default router