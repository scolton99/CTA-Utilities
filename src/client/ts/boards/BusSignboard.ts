import AbstractSignboard from './AbstractSignboard';
import IPane from '../panes/IPane';
import {BusArrivalsPane} from '../panes/BusArrivalsPane';

const COLS = [30, 144, 17];
const HEIGHT = 32;

export class BusSignboard extends AbstractSignboard {
    protected clearError(): void {
    }

    protected getCycleTime(): number {
        return Number.MAX_VALUE;
    }

    protected getPanes(): Array<IPane> {
        return [ new BusArrivalsPane() ];
    }

    protected showError(msg: string): void {
    }
}