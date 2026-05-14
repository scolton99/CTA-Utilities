import { Handler } from 'express';
import { uriSafeStationIdMap as stationIdMap } from '../../shared/util/CTAData.js';

declare module 'express-serve-static-core' {
    interface Request {
        stationId?: number
    }
}

const stationIdDecoder: Handler = (req, _res, next) => {
    if (!req.params.station || Array.isArray(req.params.station)) {
        next();
        return;
    }
    
    req.stationId = stationIdMap[req.params.station.toLowerCase()];
    next();
};

export default stationIdDecoder;