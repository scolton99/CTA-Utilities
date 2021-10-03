import AlertsPane from '../panes/AlertsPane';
import AbstractSignboard from './AbstractSignboard';
import InfoPane from '../panes/InfoPane';
import ArrivalsPane from '../panes/ArrivalsPane';
import IPane from '../panes/IPane';

export class TrainSignboard extends AbstractSignboard {
    protected getCycleTime(): number {
        return 9 * 1000;
    }
    
    protected getPanes(): Array<IPane> {
        return [new InfoPane(), new AlertsPane(), new ArrivalsPane()];
    }
}

