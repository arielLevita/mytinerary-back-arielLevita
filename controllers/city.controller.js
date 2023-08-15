import City from '../models/city.js';

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
            const singleCity = await City.findById(req.params.id);

            if(singleCity) {
                res.status(200).json({
                    success: true,
                    city: singleCity
                })
            }
            return res.status(404).json ({
                success: false,
                message: 'City not found'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Getting City error'
            })
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
    }
}

export default controller;