import IPane from '../panes/IPane';

export default abstract class AbstractSignboard {
    protected readonly PANES:  Array<IPane>  = [];
    protected readonly ERRORS: Array<string> = []
    
    public constructor() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.init();
        } else {
            window.addEventListener('DOMContentLoaded', this.init);
        }
    }
    
    private readonly init = (): void => {
        this.PANES.push(...this.getPanes());
        this.ERRORS.push('');
    
        const cycleTick = this.cycle();
        cycleTick().then();
    };
    
    private readonly cycle = (): (() => Promise<void>) => {
        let currentPane = -1;
        
        const cycleTick = async (): Promise<void> => {
            const prevPane = currentPane !== -1 ? this.PANES[currentPane] : null;
            
            let nextPane: IPane;
            do {
                ++currentPane;
                currentPane = currentPane % this.PANES.length;
                
                nextPane = this.PANES[currentPane];
            } while (nextPane.shouldSkip());
            
            console.log(`Progressing to pane ${currentPane}`);
            
            try {
                await nextPane.prepare();
                this.ERRORS[currentPane] = '';
            } catch (e: any) {
                this.ERRORS[currentPane] = e.message;
            }

            if (this.ERRORS.find(it => !!it))
                this.showError(this.ERRORS.join(' '));
            else
                this.clearError();
                
            await prevPane?.hide();
            await nextPane.show();
            
            window.setTimeout(cycleTick, this.getCycleTime());
        };
        
        return cycleTick;
    };
    
    protected abstract getCycleTime(): number;
    protected abstract getPanes(): Array<IPane>;
    protected abstract showError(msg: string): void;
    protected abstract clearError(): void;
}