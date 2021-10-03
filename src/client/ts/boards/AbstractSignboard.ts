import IPane from '../panes/IPane';

export default abstract class AbstractSignboard {
    protected readonly PANES: Array<IPane> = [];
    
    public constructor() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.init();
        } else {
            window.addEventListener('DOMContentLoaded', this.init);
        }
    }
    
    private readonly init = (): void => {
        this.PANES.push(...this.getPanes());
    
        const cycleTick = this.cycle();
        cycleTick().then();
    };
    
    private readonly cycle = (): (() => Promise<void>) => {
        let currentPane = -1;
        
        const cycleTick = async (): Promise<void> => {
            if (currentPane !== -1) {
                const pane = this.PANES[currentPane];
                await pane.hide();
            }
            
            let nextPane: IPane;
            do {
                ++currentPane;
                currentPane = currentPane % this.PANES.length;
                
                nextPane = this.PANES[currentPane];
            } while (nextPane.shouldSkip());
            
            console.log(`Progressing to pane ${currentPane}`);
            
            await nextPane.prepare();
            await nextPane.show();
            
            window.setTimeout(cycleTick, this.getCycleTime());
        };
        
        return cycleTick;
    };
    
    protected abstract getCycleTime(): number;
    protected abstract getPanes(): Array<IPane>;
}