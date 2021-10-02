import AbstractPane from './AbstractPane';
import Alert from '../models/Alert';
import getStationId from '../util/StationID';

export default class AlertsPane extends AbstractPane {
    private static readonly ALERTS_REFRESH_DELAY_MS = 5 * 60 * 1000;
    private readonly ALERT_INTERVAL: number;
    
    private alerts: Array<Alert> = [];
    private currentAlert = -1;
    
    public constructor() {
        super(AlertsPane.findElement());
        this.updateAlerts().then();
        this.ALERT_INTERVAL = window.setInterval(this.updateAlerts, AlertsPane.ALERTS_REFRESH_DELAY_MS);
    }
    
    protected static findElement = (): HTMLElement => {
        return AbstractPane.findElementByClass('alerts');
    };
    
    public override prepare = async (): Promise<void> => {
        this.reRenderAlert();
    };
    
    public override shouldSkip = (): boolean => {
        return this.alerts.length === 0;
    };
    
    private readonly updateAlerts = async (): Promise<void> => {
        const stationId = getStationId();
        
        this.alerts = await Alert.getCurrentAlerts(stationId);
    };
    
    private readonly reRenderAlert = (): void => {
        if (this.alerts.length === 0)
            return;
        
        ++this.currentAlert;
        this.currentAlert = this.currentAlert % this.alerts.length;
        
        const alert = this.alerts[this.currentAlert];
        
        const alertBody      = <HTMLElement>      this.rootDom.getElementsByClassName('alert-body')[0];
        const alertTypeImage = <HTMLImageElement> this.rootDom.querySelector('#alert-footer-type-image');
        const alertType      = <HTMLElement>      this.rootDom.getElementsByClassName('alert-footer-type')[0];
        const alertTimestamp = <HTMLElement>      this.rootDom.getElementsByClassName('alert-footer-timestamp')[0];
        
        alertBody.textContent    = alert.getDescription();
        alertTypeImage.src      = `/static/images/${alert.getIcon()}.svg`;
        alertType.textContent    = alert.getImpact();
        alertTimestamp.innerHTML = alert.timestampString();
        
        console.log(`Re-rendered alerts. Now on alert ${this.currentAlert}`);
    };
}