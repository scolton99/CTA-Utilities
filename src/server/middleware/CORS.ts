import { Handler } from 'express';

const { DEVELOPMENT, ORIGIN } = process.env;

const CORS: Handler = (_req, res, next) => {
    res.set('Access-Control-Allow-Origin', DEVELOPMENT ? '*' : ORIGIN);
    next();
};

export default CORS;