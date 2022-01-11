const express = require('express');
const got = require('got');
const { query } = require('express-validator');
const validator = require('../../helpers/validation');

const router = express.Router();
require('dotenv').config();

router.get('/',
    [query('lat').isNumeric(), query('lon').isNumeric()],
    validator,
    async (req, res, next) => {
    const { lat, lon } = req.query;

    try {
        const response = await got(process.env.URL, {
            searchParams: {
                lat,
                lon,
                units: process.env.UNITS,
                appid: process.env.API_KEY,
            }
        });

        const { sys, name, weather, main, wind } = JSON.parse(response.body);
        res.json({
            country: sys.country,
            city: name,
            weather: weather.main,
            temp: {
                fact: main.temp,
                feels_like: main.feels_like
            },
            wind: wind.speed
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
