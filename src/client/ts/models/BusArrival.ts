import SharedBusArrival, { BusArrivalJSON } from '../../../shared/models/BusArrival';

export default class BusArrival extends SharedBusArrival {
    public constructor(apiObj: BusArrivalJSON) {
        super();

        this.generatedTime  = apiObj.generatedTime;
        this.predictionType = apiObj.predictionType;
        this.stopName       = apiObj.stopName;
        this.stopId         = apiObj.stopId;
        this.route          = apiObj.route;
        this.direction      = apiObj.direction;
        this.destination    = apiObj.destination;
        this.predictionTime = apiObj.predictionTime;
        this.countdown      = apiObj.countdown;
        this.delayed        = apiObj.delayed;
    }

    public static async getArrivals(stopId: string): Promise<Array<BusArrival>> {
        const resRaw = await fetch(`/bus/api/arrivals/${stopId}`);
        const res = await resRaw.json();

        const arrivals: Array<BusArrival> = [];
        for (const arrival of res) {
            arrivals.push(new BusArrival(arrival));
        }

        return arrivals;
    }
}