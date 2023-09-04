import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';

const router = express.Router();

router.get('/', itineraryController.getItineraries);

router.get('/', itineraryController.getItineraryById);

router.post('/', itineraryController.createItinerary);

export default router