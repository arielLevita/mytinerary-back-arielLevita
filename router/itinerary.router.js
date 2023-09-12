import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';
import { validator } from '../middlewares/validator.js';
import { createItinerarySchema, updateItinerarySchema } from '../schema/itinerary.schema.js';
import passport from '../middlewares/passport.js';

const router = express.Router();
const {getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary} = itineraryController;

router.get('/', getItineraries);
router.get('/:id', getItineraryById);
router.post('/', passport.authenticate('jwt', { session: false }), validator(createItinerarySchema), createItinerary);
router.put('/:id', passport.authenticate('jwt', { session: false }), validator(updateItinerarySchema), updateItinerary);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteItinerary);

export default router