import InfoPane from './panes/InfoPane';
import ArrivalsPane from './panes/ArrivalsPane';
import AlertsPane from './panes/AlertsPane';
import IPane from './panes/IPane';

export class CTASignboard {
    private static readonly PANE_DISPLAY_DURATION_MS = 9 * 1000;
    
    public panes: Array<IPane> = [];
    
    private readonly CYCLE_TIMEOUT: number;
    
    public constructor() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.init();
        } else {
            window.addEventListener('DOMContentLoaded', this.init);
        }
    }

    private readonly init = (): void => {
        const infoPane     = new InfoPane();
        const alertsPane   = new AlertsPane();
        const arrivalsPane = new ArrivalsPane();
        
        if (location.hash.includes('arrivals'))
            this.panes.push(arrivalsPane);
        else if (location.hash.includes('alerts'))
            this.panes.push(alertsPane);
        else
            this.panes.push(infoPane, alertsPane, arrivalsPane);

        const cycleTick = this.cycle();
        cycleTick().then();
    };

    private readonly cycle = (): (() => Promise<void>) => {
        let currentPane = -1;

        const cycleTick = async (): Promise<void> => {
            if (currentPane !== -1) {
                const pane = this.panes[currentPane];
                await pane.hide();
            }

            let nextPane: IPane;
            do {
                ++currentPane;
                currentPane = currentPane % this.panes.length;
                
                nextPane = this.panes[currentPane];
            } while (nextPane.shouldSkip());
            
            console.log(`Progressing to pane ${currentPane}`);
            
            await nextPane.prepare();
            await nextPane.show();

            window.setTimeout(cycleTick, CTASignboard.PANE_DISPLAY_DURATION_MS);
        };

        return cycleTick;
    };
}

