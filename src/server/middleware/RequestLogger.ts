import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Logger from '../util/Logger';

declare module 'express-serve-static-core' {
    interface Request {
        uuid: string
    }
}

const logger: Logger = new Logger({ name: 'RequestLogger' });

export default (req: Request, _res: Response, next: NextFunction): void => {
    req.uuid = uuid();
    logger.log(`[${req.uuid}] (${req.ip}) ${req.method.toUpperCase()} ${req.path}`);
    next();
};
