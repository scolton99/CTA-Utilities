import AbstractPane from './AbstractPane';
import BusArrival from '../models/BusArrival';
import { getStopId } from '../util/StationID';

export class BusArrivalsPane extends AbstractPane {
    private arrivals: Array<BusArrival>;

    public constructor() {
        super(AbstractPane.findElementByClass('bus-arrivals'));
    }

    public async show(): Promise<void> {
        this.rootDom.classList.remove('gone');
    }

    public async hide(): Promise<void> {
        this.rootDom.classList.add('gone');
    }

    public async prepare(): Promise<void> {
        return Promise.resolve();
    }

    private async loadArrivals(): Promise<void> {
        try {
            this.arrivals = await BusArrival.getArrivals(getStopId());
        } catch (e: unknown) {
            throw new Error('Arrival information\nTemporarily Unavailable');
        }
    }

    private renderArrivals(): void {

    }

}