import dotenv from "dotenv";
dotenv.config();

import express from "express";
import api_router from './controllers/API';
import dialogue_router from './controllers/Dialogue';
import { station_id_decoder, not_found } from "./util/Middleware";

const app = express();

const { PORT, DEVELOPMENT } = process.env;

app.set('view engine', 'pug');

app.use('/api', api_router);
app.use('/dialogue', dialogue_router);

if (DEVELOPMENT)
    app.use('/static', express.static('public'));

app.get('/:station', station_id_decoder, (req, res, next) => {
    if (!req.station_id)
        return next();

    res.render('index', {
        stationName: req.params.station,
        stationId: req.station_id
    });
});

app.use(not_found);

app.listen(PORT || 3000);