import { Router } from "express";
import Arrival from "../models/Arrival";
import Alert from "../models/Alert";
import CachedAPIRequest from "../util/CachedAPIRequest";
import { cors } from '../util/Middleware';

const router = Router();

router.use(cors);

router.get('/arrivals/:station', async (req, res, _next) => {
    const arrivals = await Arrival.getAll(parseInt(req.params.station));

    res.json(arrivals);
});

router.get('/alerts/:station', async (req, res, _next) => {
    const alerts = await Alert.getAll(parseInt(req.params.station));

    res.json(alerts);
});

router.get('/weather', async (req, res, _next) => {
    const raw_weather_info = await (new CachedAPIRequest("weather").send());

    res.json(JSON.parse(raw_weather_info));
});

export default router;

