import AbstractPane from './AbstractPane';
import Weather from '../models/Weather';

export default class InfoPane extends AbstractPane {
    private static readonly TIME_TICK_DELAY_MS      =      0.5 * 1000;
    private static readonly WEATHER_UPDATE_DELAY_MS = 15 * 60  * 1000;
    
    private readonly TICK_INTERVAL: number;
    private readonly WEATHER_UPDATE_INTERVAL: number;
    
    private currentWeather: Weather;
    
    public constructor() {
        super(InfoPane.findElement());
        
        this.timeTick();
        this.TICK_INTERVAL = window.setInterval(this.timeTick, InfoPane.TIME_TICK_DELAY_MS);
        
        this.updateWeather().then();
        this.WEATHER_UPDATE_INTERVAL = window.setInterval(this.updateWeather, InfoPane.WEATHER_UPDATE_DELAY_MS);
    }
    
    protected static findElement = (): HTMLElement => {
        return AbstractPane.findElementByClass('info');
    };
    
    public override prepare = async (): Promise<void> => void(0);
    
    private readonly updateWeather = async (): Promise<void> => {
        this.currentWeather = await Weather.get();
        this.reRenderWeather();
    };
    
    private readonly reRenderWeather = (): void => {
        const temperatureText    =                    this.rootDom.querySelector('#temperature-text');
        const temperatureIcon    = <HTMLImageElement> this.rootDom.querySelector('#temperature-icon');
        const weatherDescription =                    this.rootDom.querySelector('#weather-description');
        
        if (!temperatureText|| !weatherDescription)
            throw new Error('DOM not properly structured: missing #temperature-text or #weather-description');
        
        temperatureText.innerHTML      = `${this.currentWeather.getTemp()}&deg;`;
        temperatureIcon.src            = this.currentWeather.getIcon();
        weatherDescription.textContent = this.currentWeather.getMain();
    };
    
    private readonly timeTick = (): void => {
        const currentTime = new Date();
        
        const tsOptions: Readonly<Record<string, string>> = {
            hour: 'numeric',
            minute: '2-digit'
        };
        const [timeString, amPm] = <[string, string]> currentTime.toLocaleTimeString('en-US', tsOptions).split(' ');
        
        const dsOptions: Readonly<Record<string, string>> = {
            month: 'short',
            day: 'numeric'
        };
        const dateString: string = currentTime.toLocaleDateString('en-US', dsOptions);
    
        const timeField  = this.rootDom.querySelector('#timefield');
        const amPmMarker = this.rootDom.querySelector('#ampm-marker');
        const dateEl     = this.rootDom.querySelector('#date');
        
        if (!timeField)
            throw new Error('DOM is missing #timefield');
        
        if (!amPmMarker)
            throw new Error('DOM is missing #ampm-marker');
        
        if (!dateEl)
            throw new Error('DOM is missing #date');
        
        timeField.textContent  = timeString;
        amPmMarker.textContent = amPm.toLowerCase();
        dateEl.textContent     = dateString;
    };
}