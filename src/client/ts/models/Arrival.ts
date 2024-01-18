import SharedArrival, { ArrivalJSON } from '../../../shared/models/Arrival';

export default class Arrival extends SharedArrival {
    public constructor(apiObj: ArrivalJSON) {
        super();

        this.delayed     = apiObj.delayed;
        this.scheduled   = apiObj.scheduled;
        this.fault       = apiObj.fault;
        this.approaching = apiObj.approaching;

        this.stopDescription = apiObj.stopDescription;

        this.runNumber   = apiObj.runNumber;
        this.line        = apiObj.line;
        this.destination = apiObj.destination;

        this.predictionTs = new Date(apiObj.predictionTs);
        this.arrivalTs    = new Date(apiObj.arrivalTs);

        this.direction = apiObj.direction;
    }

    public static async getArrivals(stationId: number): Promise<Array<Arrival>> {
        const resRaw = await fetch(`/train/api/arrivals/${stationId}`);
        const res = await resRaw.json();

        const arrivals: Array<Arrival> = [];
        for (const arrival of res) {
            arrivals.push(new Arrival(arrival));
        }

        return arrivals;
    }
    
    public getArrivalTs(): Date {
        return this.arrivalTs;
    }

    public genDom(number: number): Element {
        const container = document.createElement('div');
        container.classList.add('train-entry');
        container.dataset.line = this.line.toLowerCase();

        if (this.line === 'Green' && this.destination === 'Cottage Grove') {
            container.classList.add('inverted');
        }
        else if (this.line === 'Blue' && this.destination === 'UIC-Halsted') {
            container.classList.add('inverted');
        }

        const numberDom = document.createElement('div');
        numberDom.classList.add('train-entry-number');
        numberDom.textContent = `${number}`;

        container.append(numberDom);

        const bodyDom = document.createElement('div');
        bodyDom.classList.add('train-entry-body');

        const details = document.createElement('div');
        details.classList.add('train-entry-details');

        const runInfo = document.createElement('span');
        runInfo.classList.add('train-entry-run-info');
        runInfo.textContent = `${this.line} Line #${this.runNumber} to`;

        const destDom = document.createElement('span');
        destDom.classList.add('train-entry-dest');
        destDom.textContent = this.destination;

        details.append(runInfo, destDom);

        bodyDom.append(details);

        const timing = document.createElement('div');
        timing.classList.add('train-entry-timing');

        const time = this.countdown(new Date());
        if (time === 0 || time === 1) {
            if (this.delayed) {
                const delayed = document.createElement('span');
                delayed.classList.add('bold');
                delayed.textContent = 'Delayed';

                timing.append(delayed);
            } else {
                const due = document.createElement('span');
                due.classList.add('bold');
                due.textContent = 'Due';

                timing.append(due);
            }
        } else {
            const timeNumber = document.createElement('span');
            timeNumber.classList.add('bold');
            timeNumber.textContent = `${time}`;

            const suffix = document.createTextNode(' min');

            timing.append(timeNumber, suffix);
        }

        bodyDom.append(timing);

        const tracking = document.createElement('div');
        tracking.classList.add('train-entry-tracking');

        const trackingImage = document.createElement('img');
        trackingImage.alt = '';
        trackingImage.src = this.scheduled ? '/static/images/scheduled.svg' : '/static/images/live-tracked.svg';

        tracking.append(trackingImage);
        bodyDom.append(tracking);

        container.append(bodyDom);

        return container;
    }
}