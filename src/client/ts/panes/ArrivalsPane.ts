import AbstractPane from './AbstractPane';
import Arrival from '../models/Arrival';
import getStationId from '../util/StationID';

export default class ArrivalsPane extends AbstractPane {
    private arrivals: Array<Arrival>;
    
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
        return Math.floor(window.innerHeight / (1.15 * ((0.05 + 0.021) * w)));
    };
    
    public prepare = async (): Promise<void> => {
        await this.updateArrivals();
        this.reRenderArrivals();
    };
    
    private readonly updateArrivals = async (): Promise<void> => {
        const stationId: number = getStationId();
        
        this.arrivals = await Arrival.getArrivals(stationId);
        console.log(`Updated arrivals: ${this.arrivals.length}`);
    };
    
    private readonly reRenderArrivals = (): void => {
        const domElement = this.rootDom;
        while (domElement.firstElementChild)
            domElement.removeChild(domElement.firstElementChild);
        
        const maxScn: number = ArrivalsPane.calculateMaxArrivals();
        const ts = new Date();
        const realArrivals = this.arrivals.filter((x: Arrival) => x.getArrivalTs().getTime() > ts.getTime());
        realArrivals.sort((arrival1, arrival2) => (arrival1.arrivalMs(ts) - arrival2.arrivalMs(ts)));
        
        const realMax = Math.min(maxScn, realArrivals.length);
        
        const arrivalsDom: Array<Node> = [];
        for (let i = 0; i < realMax; ++i) {
            arrivalsDom.push(realArrivals[i].genDom(i + 1));
        }
        
        domElement.append(...arrivalsDom);
        console.log('Arrivals re-rendered');
    };
}