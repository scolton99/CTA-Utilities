import Logger from './Logger';

const LOGGER = new Logger({ name: 'Secrets' });

export const { OW_AK, CTA_AK, CTA_BUS_AK } = process.env;

const empty = (string: string | null | undefined): boolean => {
    return typeof(string) === 'undefined' || string === null || string.length === 0;
};

export const verifySecrets = (): boolean => {
    if (empty(CTA_AK)) {
        LOGGER.error('Missing CTA API key. Please set the environment variable CTA_AK. See https://www.transitchicago.com/developers/traintrackerapply/ for more details.');
        return false;
    }
    
    if (empty(OW_AK)) {
        LOGGER.error('Missing OpenWeatherMap API key. Please set the environment variable OW_AK. See https://openweathermap.org/api for more details.');
        return false;
    }
    
    return true;
};