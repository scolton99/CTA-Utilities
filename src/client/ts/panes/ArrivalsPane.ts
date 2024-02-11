import AbstractPane from './AbstractPane';
import Arrival from '../models/Arrival';
import { getStationId } from '../util/StationID';

export default class ArrivalsPane extends AbstractPane {
    private arrivals: Array<Arrival>;
    private lastSuccessfulUpdate: Date | null = null;
    
    public constructor() {
        super(ArrivalsPane.findElement());
        this.updateArrivals().then();
        window.addEventListener('resize', this.reRenderArrivals);
    }
    
    protected static findElement = (): HTMLElement => {
        return AbstractPane.findElementByClass('arrivals');
    };
    
    private static readonly calculateMaxArrivals = (): number => {
        const w = window.innerWidth;
        return Math.floor(window.innerHeight / (1.05 * (0.089 * w)));
    };
    
    public prepare = async (): Promise<void> => {
        try {
            await this.updateArrivals();
        } finally {
            this.reRenderArrivals();
        }
    };
    
    private readonly updateArrivals = async (): Promise<void> => {
        const stationId: number = getStationId();
        
        try {
            this.arrivals = await Arrival.getArrivals(stationId);
            console.log(`Updated arrivals: ${this.arrivals.length}`);
            this.lastSuccessfulUpdate = new Date();
        } catch (e: unknown) {
            let message = 'Trouble fetching arrivals from server.';

            if (this.lastSuccessfulUpdate)
                message += ' Showing data from ' + this.lastSuccessfulUpdate.toLocaleString('en-US') + '.';

            throw new Error(message);
        }
    };
    
    private readonly reRenderArrivals = (): void => {
        const domElement = this.rootDom;
        while (domElement.firstElementChild)
            domElement.removeChild(domElement.firstElementChild);
        
        const maxScn: number = ArrivalsPane.calculateMaxArrivals();
        const ts = new Date();
        const realArrivals = this.arrivals.filter((x: Arrival) => x.getArrivalTs().getTime() > ts.getTime());
        realArrivals.sort((arrival1, arrival2) => (arrival1.arrivalMs(ts) - arrival2.arrivalMs(ts)));
        
        console.log(maxScn);
        const realMax = Math.min(maxScn, realArrivals.length);
        
        const arrivalsDom: Array<Node> = [];
        for (let i = 0; i < realMax; ++i) {
            arrivalsDom.push(realArrivals[i].genDom(i + 1));
        }
        
        domElement.append(...arrivalsDom);
        console.log('Arrivals re-rendered');
    };
}