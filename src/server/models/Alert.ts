import SharedAlert from '../../shared/models/Alert';
import CachedAPIRequest from "../util/CachedAPIRequest";
import { ServiceType } from "../../shared/util/CTAData";

interface AlertAPIResponseEntry {
    AlertId: string,
    Headline: string,
    ShortDescription: string,
    FullDescription: {
        "#cdata-section": string,
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
        "#cdata-section": string
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
                "#cdata-section": string
            }
        }
    }
}

interface AlertAPIResponse {
    CTAAlerts: {
        TimeStamp: string,
        ErrorCode: string,
        ErrorMessage: string | null,
        Alert: Array<AlertAPIResponseEntry>
    }
}

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

    private static fromAPIResponse = (response: AlertAPIResponse): Array<Alert> => {
        const { CTAAlerts: { Alert: alerts } } = response;

        const alerts_obj: Array<Alert> = [];

        for (const alert of alerts) {
            alerts_obj.push(new Alert(alert));
        }

        return alerts_obj;
    };

    public static getAll = async (station_id: number): Promise<Array<Alert>> => {
        const response = await (new CachedAPIRequest("alerts", `${station_id}`).send());

        return Alert.fromAPIResponse(JSON.parse(response));
    };

    toJSON = () => ({
        start: this.start,
        end: this.end,
        icon: this.icon,
        id: this.id,
        headline: this.headline,
        description: this.description,
        impact: this.impact
    });
}