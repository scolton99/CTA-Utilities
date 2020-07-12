import { Handler } from "express";
import { uri_safe_station_id_map as station_id_map } from "../../shared/util/CTAData";

declare module 'express-serve-static-core' {
    interface Request {
        station_id?: number;
    }
}

const { DEVELOPMENT } = process.env;

export const station_id_decoder: Handler = (req, res, next) => {
    if (!req.params.station)
        return next();

    req.station_id = station_id_map[req.params.station.toLowerCase()];
    next();
};

export const not_found: Handler = (_req, res, _next) => {
    res.status(404).send();
};

export const cors: Handler = (_req, res, next) => {
    res.set("Access-Control-Allow-Origin", DEVELOPMENT ? "*" : "https://cta.sdc.sx");
    next();
};

