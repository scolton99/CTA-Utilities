import SharedArrival from '../../shared/models/Arrival';

export default class Arrival extends SharedArrival {
    constructor(api_obj) {
        super();

        this.delayed = api_obj.delayed;
        this.scheduled = api_obj.scheduled;
        this.fault = api_obj.fault;
        this.approaching = api_obj.approaching;

        this.stop_description = api_obj.stop_description;

        this.run_number = api_obj.run_number;
        this.line = api_obj.line;

        this.destination = api_obj.destination;

        this.prediction_ts = new Date(api_obj.prediction_ts);
        this.arrival_ts = new Date(api_obj.arrival_ts);

        this.direction = api_obj.direction;
    }

    static get_arrivals = async (station_id: number): Promise<Array<Arrival>> => {
        const res_raw = await fetch(`/api/arrivals/${station_id}`);
        const res = await res_raw.json();

        const arrivals: Array<Arrival> = [];
        for (const arrival of res) {
            arrivals.push(new Arrival(arrival));
        }

        return arrivals;
    };

    gen_dom = (number: number): Element => {
        const container = document.createElement("div");
        container.classList.add("train-entry");
        container.dataset.line = this.line.toLowerCase();

        if (this.line === "Green" && this.destination === "Cottage Grove") {
            container.classList.add("inverted");
        }

        const number_dom = document.createElement("div");
        number_dom.classList.add("train-entry-number");
        number_dom.textContent = `${number}`;

        container.append(number_dom);

        const body_dom = document.createElement("div");
        body_dom.classList.add("train-entry-body");

        const details = document.createElement("div");
        details.classList.add("train-entry-details");

        const run_info = document.createElement("span");
        run_info.classList.add("train-entry-run-info");
        run_info.textContent = `${this.line} Line #${this.run_number} to`;

        const dest_dom = document.createElement("span");
        dest_dom.classList.add("train-entry-dest");
        dest_dom.textContent = this.destination;

        details.append(run_info, dest_dom);

        body_dom.append(details);

        const timing = document.createElement("div");
        timing.classList.add("train-entry-timing");

        const time = this.countdown();
        if (time === 0 || time === 1) {
            if (this.delayed) {
                const delayed = document.createElement("span");
                delayed.classList.add("bold");
                delayed.textContent = "Delayed";

                timing.append(delayed);
            } else {
                const due = document.createElement("span");
                due.classList.add("bold");
                due.textContent = "Due";

                timing.append(due);
            }
        } else {
            const time_number = document.createElement("span");
            time_number.classList.add("bold");
            time_number.textContent = `${time}`;

            const suffix = document.createTextNode(" min");

            timing.append(time_number, suffix);
        }

        body_dom.append(timing);
        container.append(body_dom);

        return container;
    }
}