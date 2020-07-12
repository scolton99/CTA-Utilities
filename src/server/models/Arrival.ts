import SharedArrival from '../../shared/models/Arrival';
import CachedAPIRequest from "../util/CachedAPIRequest";

interface ArrivalAPIResponseEntry {
    staId: string,
    stpId: string,
    staNm: string,
    stpDe: string,
    rn: string,
    rt: string,
    destSt: string,
    destNm: string, /* TODO: enum? */
    trDr: string,
    prdt: string,
    arrT: string,
    isApp: string,
    isSch: string,
    isDly: string,
    isFlt: string,
    flags: null,
    lat: string,
    lon: string,
    heading: string
}

interface ArrivalAPIResponse {
    ctatt: {
        tmst: string,
        errCd: string,
        errNm: string | null,
        eta: Array<ArrivalAPIResponseEntry>
    }
}

export default class Arrival extends SharedArrival {
    private constructor(arrival: ArrivalAPIResponseEntry) {
        super();

        this.delayed = arrival.isDly === "1";
        this.scheduled = arrival.isSch === "1";
        this.fault = arrival.isFlt === "1";
        this.approaching = arrival.isApp === "1";

        this.stop_description = arrival.stpDe;

        this.run_number = parseInt(arrival.rn);
        this.line = arrival.rt;

        this.destination = arrival.destNm;

        this.prediction_ts = new Date(arrival.prdt);
        this.arrival_ts = new Date(arrival.arrT);

        this.direction = parseInt(arrival.trDr);
    }

    private static fromAPIResponse = (response: ArrivalAPIResponse): Array<Arrival> => {
        const { ctatt: { eta: trains } } = response;

        const arrivals: Array<Arrival> = [];

        for (const arrival of trains)
            arrivals.push(new Arrival(arrival));

        return arrivals;
    };

    public static getAll = async (station_id: number): Promise<Array<Arrival>> => {
        const response = await (new CachedAPIRequest("arrivals", `${station_id}`).send());

        return Arrival.fromAPIResponse(JSON.parse(response));
    };

    get_time_string = (): string => {
        const time = this.countdown();
        return time == 1 ? "in one minute" : time == 0 ? "now" : `in ${time} minutes`;
    };

    toJSON = () => ({
        delayed: this.delayed,
        scheduled: this.scheduled,
        fault: this.fault,
        approaching: this.approaching,
        stop_description: this.stop_description,
        run_number: this.run_number,
        line: this.line,
        destination: this.destination,
        prediction_ts: this.prediction_ts,
        arrival_ts: this.arrival_ts,
        direction: this.direction
    });
}