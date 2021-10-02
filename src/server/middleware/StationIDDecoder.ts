import { Handler } from 'express';
import { uriSafeStationIdMap as stationIdMap } from '../../shared/util/CTAData';

declare module 'express-serve-static-core' {
    interface Request {
        stationId?: number
    }
}

const stationIdDecoder: Handler = (req, res, next) => {
    if (!req.params.station) {
        next();
        return;
    }
    
    req.stationId = stationIdMap[req.params.station.toLowerCase()];
    next();
};

export default stationIdDecoder;