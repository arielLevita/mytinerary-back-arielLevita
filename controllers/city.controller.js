import City from '../models/City.js';

const controller = {
    getCities: async (req, res) => {
        let queries = {};
        if(req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i');
        }
        try {
            const cities = await City.find(queries).populate('user');
            if(cities.length > 0) {   
                return res.status(200).json({
                    success: true,
                    cities: cities
                })
            }
            return res.status(404).json({
                succes: false,
                message: 'There are no cities matching your search'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Getting Cities error'
            })
        }
    },
    getCityById: async (req, res) => {
        try {
            const cityId = req.params.id;
            const city = await City.findById(cityId);
            if (!city) {
                return res.status(404).json({ error: 'City not found' });
            }
            res.json({ city });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    createCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'City generated'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Failed to create City'
            })
        }
    },
    updateCity: async(req, res) => {
        try {
            await City.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({
                success: true,
                message: 'City updated successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to update the City'
            })
        }
    },
    deleteCity: async(req, res) => {
        try {
            await City.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success: true,
                message: 'City deleted successfully'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: 'Error trying to delete the City'
            })
        }
    },
}

export default controller;