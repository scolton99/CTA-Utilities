import { Router } from "express";
import bodyParser from "body-parser";
import { validate_destination, station_id, get_destination_code } from "../../shared/util/CTAData";
import Arrival from "../models/Arrival";

const router = Router();

const gen_webhook_response = (text: string) => {
    return {
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        text
                    ]
                }
            }
        ],
        "payload": {
            "google": {
                "expectUserResponse": false,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": text
                            }
                        }
                    ]
                }
            }
        }
    };
};

router.post('/', bodyParser.json(), async (req, res, _next) => {
    const { station, destination, line: line_raw } = req.body.queryResult.parameters;
    const line = line_raw[0].toUpperCase() + line_raw.slice(1);

    if (!validate_destination(destination, line)) {
        return res.json(gen_webhook_response(`${line} line trains do not run to ${destination}.`));
    }

    const st_code = station_id(station, line);
    if (st_code === -1) {
        return res.json(gen_webhook_response(`Sorry, I couldn't find a station named ${station} on the ${line} line.`));
    }

    const arrivals: Array<Arrival> = await Arrival.getAll(st_code);

    const dest_code = get_destination_code(destination, line, station);

    if (dest_code === -1) {
        return res.json(gen_webhook_response(`Sorry, trains to ${destination} don't seem to run at ${station}.`));
    }

    const directed_arrivals = arrivals.filter((x: Arrival) => {
        if (line === "Green" && (destination === "Ashland/63rd" || destination === "Cottage Grove")) {
            return x.destination === destination && x.direction === dest_code;
        } else {
            return x.direction === dest_code;
        }
    });

    directed_arrivals.sort((x: Arrival, y: Arrival) => (x.arrival_ts.getTime() - y.arrival_ts.getTime()));

    const dest_str = destination === "Loop" ? "the Loop" : destination;

    if (directed_arrivals.length === 0) {
        return res.json(gen_webhook_response(`There aren't any ${line} line trains scheduled to ${dest_str} at ${station} right now.`));
    }

    const time_strs = directed_arrivals.map(arrival => arrival.get_time_string());

    if (directed_arrivals.length === 1) {
        res.json(gen_webhook_response(`There is a ${line} line train to ${dest_str} leaving from ${station} ${time_strs[0]}. There are none currently scheduled after that.`));
    } else {
        res.json(gen_webhook_response(`There is a train to ${destination} leaving from ${station} ${time_strs[0]}. The next is leaving ${time_strs[1]}.`));
    }
});

export default router;