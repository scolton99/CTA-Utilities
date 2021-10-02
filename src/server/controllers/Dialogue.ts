import { Router } from 'express';
import bodyParser from 'body-parser';
import { validateDestination, stationId, getDestinationCode } from '../../shared/util/CTAData';
import Arrival from '../models/Arrival';

const router = Router();

const genWebhookResponse = (text: string): Record<string, unknown> => {
    return {
        'fulfillmentMessages': [
            {
                'text': {
                    'text': [
                        text
                    ]
                }
            }
        ],
        'payload': {
            'google': {
                'expectUserResponse': false,
                'richResponse': {
                    'items': [
                        {
                            'simpleResponse': {
                                'textToSpeech': text
                            }
                        }
                    ]
                }
            }
        }
    };
};

router.post('/', bodyParser.json(), async (req, res) => {
    const { station, destination, line: lineRaw } = req.body.queryResult.parameters;
    const line = lineRaw[0].toUpperCase() + lineRaw.slice(1);

    if (!validateDestination(destination, line)) {
        return res.json(genWebhookResponse(`${line} line trains do not run to ${destination}.`));
    }

    const stationCode = stationId(station, line);
    if (!stationCode) {
        return res.json(genWebhookResponse(`Sorry, I couldn't find a station named ${station} on the ${line} line.`));
    }
    
    const arrivals: Array<Arrival> = await Arrival.getCurrent(stationCode);

    const destinationCode = getDestinationCode(destination, line, station);

    if (destinationCode === -1) {
        return res.json(genWebhookResponse(`Sorry, trains to ${destination} don't seem to run at ${station}.`));
    }

    const directedArrivals = arrivals.filter((x: Arrival) => {
        if (line === 'Green' && (destination === 'Ashland/63rd' || destination === 'Cottage Grove')) {
            return x.getDestination() === destination && x.getDirection() === destinationCode;
        } else {
            return x.getDirection() === destinationCode;
        }
    });

    directedArrivals.sort((x: Arrival, y: Arrival) => (x.getArrivalTs().getTime() - y.getArrivalTs().getTime()));

    const destinationString = destination === 'Loop' ? 'the Loop' : destination;

    if (directedArrivals.length === 0) {
        return res.json(genWebhookResponse(`There aren't any ${line} line trains scheduled to ${destinationString} at ${station} right now.`));
    }

    const timeStrings = directedArrivals.map(arrival => arrival.getTimeString());

    if (directedArrivals.length === 1) {
        res.json(genWebhookResponse(`There is a ${line} line train to ${destinationString} leaving from ${station} ${timeStrings[0]}. There are none currently scheduled after that.`));
    } else {
        res.json(genWebhookResponse(`There is a train to ${destination} leaving from ${station} ${timeStrings[0]}. The next is leaving ${timeStrings[1]}.`));
    }
});

export default router;