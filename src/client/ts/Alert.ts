import SharedAlert from '../../shared/models/Alert';

export default class Alert extends SharedAlert {
    constructor(api_obj) {
        super();

        this.id = api_obj.id;
        this.icon = api_obj.icon;
        this.headline = api_obj.headline;
        this.description = api_obj.description;
        this.impact = api_obj.impact;

        this.start = new Date(api_obj.start);
        this.end = new Date(api_obj.end);
    }

    static get_alerts = async (station_id: number): Promise<Array<Alert>> => {
        const alerts_raw = await fetch(`/api/alerts/${station_id}`);
        const alerts_json = await alerts_raw.json();

        const alerts: Array<Alert> = [];
        for (const alert of alerts_json) {
            alerts.push(new Alert(alert));
        }

        return alerts;
    };

    static get_current_alerts = async (station_id: number): Promise<Array<Alert>> => {
        return (await Alert.get_alerts(station_id)).filter(x => x.start.getTime() <= Date.now());
    }
}