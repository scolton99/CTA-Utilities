import { Destination, DisplayLineName } from '../util/CTAData';

export interface ArrivalJSON {
    delayed:         boolean,
    scheduled:       boolean,
    fault:           boolean,
    approaching:     boolean,
    stopDescription: string,
    runNumber:       number,
    line:            DisplayLineName,
    destination:     Destination,
    predictionTs:    Date,
    arrivalTs:       Date,
    direction:       number
}

export default abstract class Arrival {
    protected delayed:     boolean;
    protected scheduled:   boolean;
    protected fault:       boolean;
    protected approaching: boolean;
    
    // ex. "Service toward Loop"
    protected stopDescription: string;
    
    protected runNumber:    number;
    protected line:         DisplayLineName;
    protected destination:  Destination; // enum?
    protected predictionTs: Date;
    protected arrivalTs:    Date;
    protected direction:    number;
    
    public countdown(ts: Date): number {
        return Math.round(this.arrivalMs(ts) / (1000 * 60));
    }
    
    public arrivalMs(ts: Date): number {
        return this.arrivalTs.getTime() - ts.getTime();
    }
}