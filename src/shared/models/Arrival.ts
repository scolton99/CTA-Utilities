export default abstract class Arrival {
    delayed: boolean;
    scheduled: boolean;
    fault: boolean;
    approaching: boolean;

    // ex. "Service toward Loop"
    stop_description: string;

    run_number: number;
    line: string;

    destination: string; // enum?

    prediction_ts: Date;
    arrival_ts: Date;

    direction: number;

    countdown = (): number => (Math.round((this.arrival_ts.getTime() - Date.now()) / (1000 * 60)));
}