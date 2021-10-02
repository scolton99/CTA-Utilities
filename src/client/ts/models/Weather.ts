/* eslint-disable @typescript-eslint/naming-convention */
interface WeatherAPIMainData {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number
}
/* eslint-enable @typescript-eslint/naming-convention */

interface WeatherAPIWeatherData {
    id:          number,
    main:        string,
    description: string,
    icon:        string
}

interface WeatherAPIResponse {
    weather: Array<WeatherAPIWeatherData>,
    main: WeatherAPIMainData
}

export default class Weather {
    private readonly TEMP: number;
    private readonly ICON: string;
    private readonly MAIN: string;
    
    public constructor(weatherObj: WeatherAPIResponse) {
        this.TEMP       = Weather.kelvinToFahrenheit(weatherObj.main.temp);
        const icoPrefix = weatherObj.weather[0].icon.substr(0, 2);
        this.ICON       = `https://openweathermap.org/img/wn/${icoPrefix}d@2x.png`;
        this.MAIN       = weatherObj.weather[0].main;
    }
    
    private static readonly kelvinToFahrenheit = (temp: number): number => (
        Math.round((temp - 273.15) * (9.0 / 5.0) + 32.0)
    );
    
    public getTemp = (): number => {
        return this.TEMP;
    };
    
    public getIcon = (): string => {
        return this.ICON;
    };
    
    public getMain = (): string => {
        return this.MAIN;
    };
}