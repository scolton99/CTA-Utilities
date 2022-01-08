import dotenv from 'dotenv';
dotenv.config();

import Logger from './util/Logger';

import express from 'express';
import trainApiRouter from './controllers/TrainAPI';
import dialogueRouter from './controllers/Dialogue';
import stationIdDecoder from './middleware/StationIDDecoder';
import notFound from './middleware/NotFound';
import { verifySecrets } from './util/Secrets';
import RequestLogger from './middleware/RequestLogger';
import { hashElement } from 'folder-hash';

const { exit, env: { PORT, DEVELOPMENT, VERBOSE } } = process;

const SERVER = express();
const LOGGER = new Logger({ name: 'App' });

const main = (): void => {
    if (!verifySecrets())
        exit(1);
    
    setup();
    start();
};

const setup = (): void => {
    SERVER.set('view engine', 'pug');
    LOGGER.info('View engine initialized');

    if (DEVELOPMENT || VERBOSE) {
        SERVER.use(RequestLogger);
        LOGGER.warn('Logging verbose data about requests');
    }

    if (DEVELOPMENT) {
        SERVER.use('/static', express.static('public'));
        LOGGER.warn('Express serving static assets directory -- please disable this in production.');
    }

    SERVER.use('/train/api', trainApiRouter);
    SERVER.use('/dialogue', dialogueRouter);

    SERVER.get('/train/:station', stationIdDecoder, (req, res, next) => {
        if (!req.stationId)
        { next(); return; }
    
        res.render('train', {
            stationName: req.params.station,
            stationId: req.stationId
        });
    });

    SERVER.get('/client-version', async (req, res) => {
        const hash = await hashElement('.', {
            folders: {
                include: ['public/**', 'public'],
                matchPath: true
            },
            files: {
                include: ['public/**/*'],
                exclude: ['*.map', '.*'],
                matchPath: true
            }
        });

        res.send(hash.hash);
    });

    SERVER.use(notFound);
};

const start = (): void => {
    const port = PORT || 3000;
    SERVER.listen(port);
    LOGGER.info(`Now listening on port ${port}`);
};

main();


