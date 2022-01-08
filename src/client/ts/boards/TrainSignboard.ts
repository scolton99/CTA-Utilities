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

    private errorDiv(): HTMLElement | null {
        return document.getElementById("error");
    }

    private errorDetail(): Element | null | undefined {
        return this.errorDiv()?.children[0]?.children[0];
    }

    protected showError(msg: string): void {
        const div = this.errorDiv();
        const detail = this.errorDetail();
        if (detail)
            detail.textContent = msg;
        
        div?.classList.add('active');    
    }

    protected clearError(): void {
        this.errorDiv()?.classList.remove('active');
    }
}

