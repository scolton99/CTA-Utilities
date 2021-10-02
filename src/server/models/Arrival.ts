import SharedArrival, { ArrivalJSON } from '../../shared/models/Arrival';
import CachedAPIRequest from '../util/CachedAPIRequest';
import { Destination, ExternalLineName, lineMap } from '../../shared/util/CTAData';
import moment from 'moment-timezone';

interface ArrivalAPIResponseEntry {
    staId:   string,
    stpId:   string,
    staNm:   string,
    stpDe:   string,
    rn:      string,
    rt:      string,
    destSt:  string,
    destNm:  string, /* TODO: enum? */
    trDr:    string,
    prdt:    string,
    arrT:    string,
    isApp:   string,
    isSch:   string,
    isDly:   string,
    isFlt:   string,
    flags:   null,
    lat:     string,
    lon:     string,
    heading: string
}

interface ArrivalAPIResponse {
    ctatt: {
        tmst:  string,
        errCd: string,
        errNm: string | null,
        eta:   Array<ArrivalAPIResponseEntry> | undefined
    }
}

export default class Arrival extends SharedArrival {
    private constructor(arrival: ArrivalAPIResponseEntry) {
        super();

        this.delayed         = arrival.isDly === '1';
        this.scheduled       = arrival.isSch === '1';
        this.fault           = arrival.isFlt === '1';
        this.approaching     = arrival.isApp === '1';
        this.stopDescription = arrival.stpDe;
        this.runNumber       = parseInt(arrival.rn);
        this.line            = lineMap[<ExternalLineName> arrival.rt];
        this.destination     = <Destination> arrival.destNm;
        this.predictionTs    = moment.tz(arrival.prdt, 'America/Chicago').toDate();
        this.arrivalTs       = moment.tz(arrival.arrT, 'America/Chicago').toDate();
        this.direction       = parseInt(arrival.trDr);
    }
    
    public static async getAll(stationId: number, uuid?: string): Promise<Array<Arrival>> {
        const request = new CachedAPIRequest('arrivals', `${stationId}`);
        request.setRequestUUID(uuid);
        const response = await request.send();
        
        return Arrival.fromAPIResponse(JSON.parse(response));
    }
    
    public static async getCurrent(stationId: number, uuid?: string): Promise<Array<Arrival>> {
        const response = await Arrival.getAll(stationId, uuid);
        
        return response.filter((x: Arrival) => x.arrivalTs.getTime() > Date.now());
    }

    private static fromAPIResponse(response: ArrivalAPIResponse): Array<Arrival> {
        const { ctatt: { eta: trains } } = response;

        const arrivals: Array<Arrival> = [];
        
        if (!trains)
            return arrivals;

        for (const arrival of trains)
            arrivals.push(new Arrival(arrival));

        return arrivals;
    }

    public getTimeString(): string {
        const time = this.countdown(new Date());
        return time === 1 ? 'in one minute' : time === 0 ? 'now' : `in ${time} minutes`;
    }
    
    public getDestination(): string {
        return this.destination;
    }
    
    public getDirection(): number {
        return this.direction;
    }
    
    public getArrivalTs(): Date {
        return this.arrivalTs;
    }

    public toJSON(): ArrivalJSON {
        return {
            delayed:         this.delayed,
            scheduled:       this.scheduled,
            fault:           this.fault,
            approaching:     this.approaching,
            stopDescription: this.stopDescription,
            runNumber:       this.runNumber,
            line:            this.line,
            destination:     this.destination,
            predictionTs:    this.predictionTs,
            arrivalTs:       this.arrivalTs,
            direction:       this.direction
        };
    }
}