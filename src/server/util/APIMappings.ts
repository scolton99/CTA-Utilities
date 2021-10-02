import { OW_AK, CTA_AK } from './Secrets';

const WEATHER_CITY_ID = 4887398;

type ApiUriGenerator = (x?: string) => string;
type APIMappings = Record<string, ApiUriGenerator>;

const apiMappings: APIMappings = {
    'arrivals': (identifier: string): string => (
        `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_AK}&outputType=JSON&mapid=${identifier}`
    ),
    'alerts': (identifier: string): string => (
        `https://lapi.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&stationid=${identifier}`
    ),
    'weather': (): string => (
        `https://api.openweathermap.org/data/2.5/weather?id=${WEATHER_CITY_ID}&appid=${OW_AK}`
    )
};

export type APIName = keyof typeof apiMappings;

export const expirations: Record<string, number> = {
    'arrivals': 5 * 60,
    'alerts':   5 * 60,
    'weather': 15 * 60
};

export default apiMappings;