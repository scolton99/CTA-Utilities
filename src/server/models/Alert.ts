import SharedAlert, { AlertJSON } from '../../shared/models/Alert';
import CachedAPIRequest from '../util/CachedAPIRequest';
import { ServiceType } from '../../shared/util/CTAData';

/*
 * Have to disable ESLint since this is the CTA API and
 * I have no control over naming conventions
 */
/* eslint-disable @typescript-eslint/naming-convention */
interface AlertAPIResponseEntry {
    AlertId: string,
    Headline: string,
    ShortDescription: string,
    FullDescription: {
        '#cdata-section': string
    },
    SeverityScore: string,
    SeverityColor: string,
    SeverityCSS: string,
    Impact: string,
    EventStart: string,
    EventEnd: string,
    TBD: string,
    MajorAlert: string,
    AlertURL: {
        '#cdata-section': string
    },
    ImpactedService: {
        Service: {
            ServiceType: string,
            ServiceTypeDescription: ServiceType,
            ServiceName: string,
            ServiceID: string,
            ServiceBackColor: string,
            ServiceTextColor: string,
            ServiceURL: {
                '#cdata-section': string
            }
        }
    }
}

interface AlertAPIResponse {
    CTAAlerts: {
        TimeStamp: string,
        ErrorCode: string,
        ErrorMessage: string | null,
        Alert?: Array<AlertAPIResponseEntry>
    }
}
/* eslint-enable @typescript-eslint/naming-convention */

export default class Alert extends SharedAlert {
    private constructor(alert: AlertAPIResponseEntry) {
        super();

        this.start = new Date(alert.EventStart);
        this.end = new Date(alert.EventEnd);

        this.icon = alert.SeverityCSS;

        this.id = parseInt(alert.AlertId);

        this.headline = alert.Headline;
        this.description = alert.ShortDescription;
        this.impact = alert.Impact;
    }
    
    public static async getAll(stationId: number, uuid?: string): Promise<Array<Alert>> {
        const request = new CachedAPIRequest('alerts', `${stationId}`);
        request.setRequestUUID(uuid);
        
        const response = await request.send();
        
        return Alert.fromAPIResponse(JSON.parse(response));
    }

    private static fromAPIResponse(response: AlertAPIResponse): Array<Alert> {
        const { CTAAlerts: { Alert: entries } } = response;

        const alerts: Array<Alert> = [];

        if (!entries)
            return alerts;
        
        for (const alert of entries)
            alerts.push(new Alert(alert));

        return alerts;
    }
    
    public toJSON(): AlertJSON {
        return {
            start:       this.start,
            end:         this.end,
            icon:        this.icon,
            id:          this.id,
            headline:    this.headline,
            description: this.description,
            impact:      this.impact
        };
    }
}