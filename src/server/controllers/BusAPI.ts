import { Router } from 'express';
import cors from '../middleware/CORS.js';
import fetch from 'node-fetch';
import APIMappings from '../util/APIMappings';
import { parseBusDate } from '../util/DateUtil';
import BusArrival from '../models/BusArrival';

const router = Router();

router.use(cors);

router.get('/time', async (_req, res) => {
    const timeRes = await fetch(APIMappings['bus-time']());

    if (!timeRes.ok) {
        res.status(timeRes.status).send(await timeRes.text());
        return;
    }

    const { 'bustime-response': { 'tm': dateTimeString } } = await timeRes.json();

    res.json(parseBusDate(dateTimeString).getTime());
});

router.get('/arrivals/:stop', async (req, res) => {
    const arrivals = await BusArrival.getAll(req.params.stop, req.uuid);
    res.json(arrivals);
});

export default router;