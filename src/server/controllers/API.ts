import { Router } from 'express';
import Arrival from '../models/Arrival';
import Alert from '../models/Alert';
import CachedAPIRequest from '../util/CachedAPIRequest';
import CORS from '../middleware/CORS';

const router = Router();

router.use(CORS);

router.get('/arrivals/:station', async (req, res) => {
    const arrivals = await Arrival.getCurrent(parseInt(req.params.station), req.uuid);

    res.json(arrivals);
});

router.get('/alerts/:station', async (req, res) => {
    const alerts = await Alert.getAll(parseInt(req.params.station), req.uuid);

    res.json(alerts);
});

router.get('/weather', async (req, res) => {
    const request = new CachedAPIRequest('weather');
    request.setRequestUUID(req.uuid);
    const rawWeatherInfo = await request.send();

    res.json(JSON.parse(rawWeatherInfo));
});

export default router;

