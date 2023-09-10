import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';
import { validator } from '../middlewares/validator.js';
import { createItinerarySchema, updateItinerarySchema } from '../schema/itinerary.schema.js';

const router = express.Router();
const {getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary} = itineraryController;

router.get('/', getItineraries);
router.get('/:id', getItineraryById);
router.post('/',validator(createItinerarySchema), createItinerary);
router.put('/:id', validator(updateItinerarySchema), updateItinerary);
router.delete('/:id', deleteItinerary);

export default router