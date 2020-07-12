const { CTA_AK_PROD, OW_AK_PROD } = process.env;
const WEATHER_CITY_ID = 4887398;

interface APIMappings {
    [key: string]: (() => string) | ((x: string) => string);
}

const api_mappings: APIMappings = {
    "arrivals": (identifier: string): string => (
        `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_AK_PROD}&outputType=JSON&mapid=${identifier}`
    ),
    "alerts": (identifier: string): string => (
        `http://lapi.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&stationid=${identifier}`
    ),
    "weather": (): string => (
        `https://api.openweathermap.org/data/2.5/weather?id=${WEATHER_CITY_ID}&appid=${OW_AK_PROD}`
    )
};

export const expirations: { [key: string]: number } = {
    "arrivals": 5 * 60,
    "alerts": 5 * 60,
    "weather": 15 * 60
};

export default api_mappings;