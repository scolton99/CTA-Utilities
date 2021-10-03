import SharedAlert, { AlertJSON } from '../../../shared/models/Alert';

export default class Alert extends SharedAlert {
    public constructor(apiJson: AlertJSON) {
        super();

        this.id          = apiJson.id;
        this.icon        = apiJson.icon;
        this.headline    = apiJson.headline;
        this.description = apiJson.description;
        this.impact      = apiJson.impact;

        this.start       = new Date(apiJson.start);
        if (apiJson.end)
            this.end     = new Date(apiJson.end);
    }

    public static async getAlerts(stationId: number): Promise<Array<Alert>> {
        const alertsRaw = await fetch(`/train/api/alerts/${stationId}`);
        const alertsJson = await alertsRaw.json();

        const alerts: Array<Alert> = [];
        for (const alert of alertsJson) {
            alerts.push(new Alert(alert));
        }

        return alerts;
    }

    public static async getCurrentAlerts(stationId: number): Promise<Array<Alert>> {
        return (await Alert.getAlerts(stationId)).filter(x => x.start.getTime() <= Date.now());
    }
    
    public getDescription(): string {
        return this.description;
    }
    
    public getIcon(): string {
        return this.icon;
    }
    
    public getImpact(): string {
        return this.impact;
    }
}