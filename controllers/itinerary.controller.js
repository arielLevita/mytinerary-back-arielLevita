import Itinerary from "../models/Itinerary.js";

const controller = {
    getItineraries: async (req, res) => {
        let queries = {};
        if(req.query.cityId) {
            queries.city = req.query.cityId
        }
        try {
            const itineraries = await Itinerary.find(queries)
                .populate('city', 'name')
                .populate('user');
            if(itineraries.length > 0) {   
                return res.status(200).json({
                    success: true,
                    itineraries: itineraries
                })
            }
            return res.status(404).json({
                succes: false,
                message: 'There are no itineraries.'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Getting Itineraries error'
            })
        }
    },
    getItineraryById: async (req, res) => {
        try {
            const itineraryId = req.params.id;
            const itinerary = await Itinerary.findById(itineraryId)
                .populate('city', 'name')
                .populate('user');
            if (!itinerary) {
                return res.status(404).json({
                    success: false,
                    message: 'Itinerary not found'
                });
            }
            return res.status(200).json({
                success: true,
                itinerary: itinerary
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    createItinerary: async (req, res) => {
        try {
            const newItinerary = await Itinerary.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'Itinerary generated'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Failed to create Itinerary'
            })
        }
    },
    updateItinerary: async(req, res) => {
        try {
            await Itinerary.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({
                success: true,
                message: 'Itinerary updated successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to update the Itinerary'
            })
        }
    },
    deleteItinerary: async(req, res) => {
        try {
            await Itinerary.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success: true,
                message: 'Itinerary deleted successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to delete the Itinerary'
            })
        }
    },
}

export default controller;