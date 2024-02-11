export interface BusArrivalJSON {
    generatedTime:  number,
    predictionType: string,
    stopName:       string,
    stopId:         string,
    route:          string,
    direction:      string,
    destination:    string,
    predictionTime: number,
    countdown:      number
    delayed:        boolean
}

export default abstract class BusArrival {
    protected generatedTime:  number;
    protected predictionType: string;
    protected stopName:       string;
    protected stopId:         string;
    protected route:          string;
    protected direction:      string;
    protected destination:    string;
    protected predictionTime: number;
    protected countdown:      number;
    protected delayed:        boolean;
};