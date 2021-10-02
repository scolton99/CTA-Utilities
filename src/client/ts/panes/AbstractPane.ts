import wait from '../util/Wait';
import IPane from './IPane';

export default abstract class AbstractPane implements IPane {
    protected rootDom: HTMLElement;
    protected readonly HIDE_DELAY_MS = 1.25 * 1000;
    protected readonly SHOW_DELAY_MS = 0.25 * 1000;
    
    protected constructor(el: HTMLElement) {
        this.rootDom = el;
    }
    
    protected static findElementByClass(className: string): HTMLElement {
        const elements = document.getElementsByClassName(className);
        
        if (elements.length === 0) {
            throw new Error(`Couldn't find element with class '${className}'`);
        }
        
        return <HTMLElement>elements[0];
    }
    
    public shouldSkip(): boolean {
        return false;
    }
    
    public async show(): Promise<void> {
        this.rootDom.classList.remove('gone');
        await wait(this.SHOW_DELAY_MS);
        this.rootDom.classList.remove('hidden');
    }
    
    public async hide(): Promise<void> {
        this.rootDom.classList.add('hidden');
        await wait(this.HIDE_DELAY_MS);
        this.rootDom.classList.add('gone');
    }
    
    public abstract prepare(): Promise<void>;
}