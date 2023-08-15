import City from '../models/city.js';

const controller = {
    getCities: async (req, res) => {

        let queries = {};

        if(req.query.name) {
            queries.name = req.query.name;
        }

        try {
            const cities = await City.find(queries)
            return res.status(200).json({
                success: true,
                cities: cities
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
                message: 'Creating City error'
            })
        }
    },
}

export default controller;