import SharedBusArrival, {BusArrivalJSON} from '../../shared/models/BusArrival';
import CachedAPIRequest from '../util/CachedAPIRequest';
import {parseBusDate} from '../util/DateUtil';

interface BusArrivalAPIResponseEntry {
    tmstmp: string,
    typ: string,
    stpnm: string,
    stpid: string,
    vid: string,
    dstp: number,
    rt: string,
    rtdd: string,
    rtdir: string,
    des: string,
    prdtm: string,
    tablockid: string,
    tatripid: string,
    origtatripno: string,
    dly: boolean,
    prdctdn: string,
    zone: string
}

interface BusArrivalAPIResponse {
    'bustime-response': {
        error?: string,
        prd: Array<BusArrivalAPIResponseEntry>
    }
}

export default class BusArrival extends SharedBusArrival {
    private constructor(busArrival: BusArrivalAPIResponseEntry) {
        super();

        this.delayed = busArrival.dly;
        this.countdown = parseInt(busArrival.prdctdn);
        this.predictionTime = parseBusDate(busArrival.prdtm).getTime();
        this.destination = busArrival.des;
        this.direction = busArrival.rtdir;
        this.route = busArrival.rt;
        this.stopId = busArrival.stpid;
        this.stopName = busArrival.stpnm;
        this.predictionType = busArrival.typ;
        this.generatedTime = parseBusDate(busArrival.tmstmp).getTime();
    }
    
    public static async getAll(stopId: string, uuid?: string): Promise<Array<BusArrival>> {
        const request = new CachedAPIRequest('bus-arrivals', stopId);
        request.setRequestUUID(uuid);
        const response = await request.send();
        
        return BusArrival.fromAPIResponse(JSON.parse(response));
    }

    private static fromAPIResponse(response: BusArrivalAPIResponse): Array<BusArrival> {
        const { 'bustime-response': { prd: buses } } = response;

        if (response['bustime-response'].error)
            throw new Error(response['bustime-response'].error);

        const arrivals: Array<BusArrival> = [];

        for (const arrival of buses)
            arrivals.push(new BusArrival(arrival));

        return arrivals;
    }

    public toJSON(): BusArrivalJSON {
        return {
            generatedTime:  this.generatedTime,
            predictionType: this.predictionType,
            stopName:       this.stopName,
            stopId:         this.stopId,
            route:          this.route,
            direction:      this.direction,
            destination:    this.destination,
            predictionTime: this.predictionTime,
            countdown:      this.countdown,
            delayed:        this.delayed,
        };
    }
}