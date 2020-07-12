import Alert from "./Alert";
import Arrival from "./Arrival";

class Weather {
    temp: number;
    icon: string;
    main: string;

    constructor(weather_obj) {
        this.temp = Math.round((weather_obj.main.temp - 273.15) * (9.0 / 5.0) + 32.0);
        const ico_prefix = weather_obj.weather[0].icon.substr(0, 2);
        this.icon = `https://openweathermap.org/img/wn/${ico_prefix}d@2x.png`;
        this.main = weather_obj.weather[0].main;
    }
}

const sleep = (ms: number): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export class CTASignboard {
    public panes: Array<HTMLElement> = [];
    cycle_timeout: number;
    time_tick_interval: number;
    weather_interval: number;
    alert_interval: number;

    alerts: Array<Alert>
    arrivals: Array<Arrival>

    current_alert: number = 0;
    current_weather: Weather = null;

    constructor() {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            this.init();
        } else {
            window.addEventListener("DOMContentLoaded", this.init);
        }
    }

    init = () => {
        this.panes.push(document.getElementsByClassName("arrivals")[0] as HTMLElement);
        this.panes.push(document.getElementsByClassName("info")[0] as HTMLElement);
        this.panes.push(document.getElementsByClassName("alerts")[0] as HTMLElement);

        this.update_arrivals().then();

        this.update_weather().then();
        this.weather_interval = window.setInterval(this.update_weather, 900000);

        this.update_alerts().then();
        this.alert_interval = window.setInterval(this.update_alerts, 300000);

        this.time_tick();
        this.time_tick_interval = window.setInterval(this.time_tick, 500);

        this.cycle_timeout = window.setTimeout(this.cycle(), 9000);
    };

    update_arrivals = async () => {
        const station_id: number = this.get_station_id();

        this.arrivals = await Arrival.get_arrivals(station_id);
    };

    get_station_id = (): number => {
        return parseInt(document.querySelector("meta[name='station_id']").getAttribute("value"));
    }

    update_weather = async () => {
        const new_weather_data = await fetch("/api/weather");
        const weather_json = await new_weather_data.json();

        this.current_weather = new Weather(weather_json);

        this.rerender_weather();
    };

    update_alerts = async () => {
        const station_id = this.get_station_id();

        this.alerts = await Alert.get_current_alerts(station_id);
    };

    rerender_alert = () => {
        if (this.alerts.length === 0)
            return;

        ++this.current_alert;
        this.current_alert = this.current_alert % this.alerts.length;

        const alert = this.alerts[this.current_alert];

        const alert_body = document.getElementsByClassName("alert-body")[0] as HTMLElement;
        const alert_type_image = document.getElementById("alert-footer-type-image") as HTMLImageElement;
        const alert_type = document.getElementsByClassName("alert-footer-type")[0] as HTMLElement;
        const alert_timestamp = document.getElementsByClassName("alert-footer-timestamp")[0] as HTMLElement;

        alert_body.textContent = alert.description;
        alert_type_image.src = `/static/images/${alert.icon}.svg`;
        alert_type.textContent = alert.impact;
        alert_timestamp.innerHTML = alert.timestamp_string();
    };

    rerender_arrivals = () => {
        const arrivals_dom = this.panes[0];
        while (arrivals_dom.firstElementChild)
            arrivals_dom.removeChild(arrivals_dom.firstElementChild);

        const arrivals_children: Array<Node> = [];
        for (let i: number = 0; i < this.arrivals.length; ++i) {
            arrivals_children.push(this.arrivals[i].gen_dom(i + 1));
        }

        arrivals_dom.append(...arrivals_children);
    };

    rerender_weather = () => {
        const temperature_text = document.getElementById("temperature-text");
        const temperature_icon = document.getElementById("temperature-icon") as HTMLImageElement;
        const weather_description = document.getElementById("weather-description");

        temperature_text.innerHTML = `${this.current_weather.temp}&deg;`;
        temperature_icon.src = this.current_weather.icon;
        weather_description.textContent = this.current_weather.main;
    };

    time_tick = () => {
        const current_time = new Date();

        const ts_options = {
            hour: "numeric",
            minute: "2-digit"
        };
        const [time_string, am_pm] = current_time.toLocaleTimeString("en-US", ts_options).split(" ") as [string, string];

        const ds_options = {
            month: "short",
            day: "numeric"
        };
        const date_string: string = current_time.toLocaleDateString("en-US", ds_options);

        document.getElementById("timefield").textContent = time_string;
        document.getElementById("ampm-marker").textContent = am_pm.toLowerCase();

        document.getElementById("date").textContent = date_string;
    };

    cycle = (): (() => void) => {
        let current_pane = 1;

        const cycle_tick = async () => {
            this.panes[current_pane].classList.add("hidden");

            if (current_pane === 1) {
                this.rerender_alert();
                this.rerender_arrivals();
            }

            await sleep(1250);

            this.panes[current_pane].classList.add("gone");

            ++current_pane;
            current_pane = current_pane % this.panes.length;

            if (current_pane === 2 && this.alerts.length === 0)
                current_pane = 0;

            this.panes[current_pane].classList.remove("gone");

            if (current_pane === 1)
                this.update_arrivals().then();

            await sleep(250);

            this.panes[current_pane].classList.remove("hidden");

            window.setTimeout(cycle_tick, 9000);
        };

        return cycle_tick;
    };
}

