interface Named {
    name: string
}

export default class Logger implements Console {
    private static readonly RED    = '\x1b[31m';
    private static readonly YELLOW = '\x1b[33m';
    private static readonly RESET  = '\x1b[0m';
    private static readonly CONSOLE: Console = global.console;
    
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public readonly Console: NodeJS.ConsoleConstructor = global.console.Console;
    
    public assert         = Logger.CONSOLE.assert;
    public clear          = Logger.CONSOLE.clear;
    public count          = Logger.CONSOLE.count;
    public countReset     = Logger.CONSOLE.countReset;
    public debug          = Logger.CONSOLE.debug;
    public dir            = Logger.CONSOLE.dir;
    public dirxml         = Logger.CONSOLE.dirxml;
    public group          = Logger.CONSOLE.group;
    public groupCollapsed = Logger.CONSOLE.groupCollapsed;
    public groupEnd       = Logger.CONSOLE.groupEnd;
    public profile        = Logger.CONSOLE.profile;
    public profileEnd     = Logger.CONSOLE.profileEnd;
    public table          = Logger.CONSOLE.table;
    public time           = Logger.CONSOLE.time;
    public timeEnd        = Logger.CONSOLE.timeEnd;
    public timeLog        = Logger.CONSOLE.timeLog;
    public timeStamp      = Logger.CONSOLE.timeStamp;
    public trace          = Logger.CONSOLE.trace;
    
    private readonly CLASS_NAME: string;
    
    public constructor(clazz?: Named) {
        if (clazz)
            this.CLASS_NAME = clazz.name;
    }
    
    private static zeroes(num: number): string {
        let ret = '';
        for (let i = 0; i < num; ++i)
            ret += '0';
        return ret;
    }
    
    private static numberFormat(num: number, len: number): string {
        let ret = num.toString();
        if (ret.length < len)
            ret = Logger.zeroes(len - ret.length) + ret;
        return ret;
    }
    
    private static ts(): string {
        const ts = new Date();
        
        const year = ts.getFullYear();
        const month = Logger.numberFormat(ts.getMonth() + 1, 2);
        const day = Logger.numberFormat(ts.getDate(), 2);
        
        const hour = Logger.numberFormat(ts.getHours(), 2);
        const minute = Logger.numberFormat(ts.getMinutes(), 2);
        const second = Logger.numberFormat(ts.getSeconds(), 2);
        const millis = Logger.numberFormat(ts.getMilliseconds(), 3);
        
        return `[${year}-${month}-${day} ${hour}:${minute}:${second}.${millis}]`;
    }
    
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
    public error(message?: any, ...optionalParams: Array<any>): void {
        Logger.CONSOLE.error(Logger.RED + Logger.ts() + this.label() + message + Logger.RESET, ...optionalParams);
    }
    
    public warn(message?: any, ...optionalParams: Array<any>): void {
        Logger.CONSOLE.warn(Logger.YELLOW + Logger.ts() + this.label() + message + Logger.RESET, ...optionalParams);
    }
    
    public info(message?: any, ...optionalParams: Array<any>): void {
        this.log(message, ...optionalParams);
    }
    
    public log(message?: any, ...optionalParams: Array<any>): void {
        Logger.CONSOLE.log(Logger.ts() + this.label() + message, ...optionalParams);
    }
    /* eslint-enable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
    
    private label(): string {
        return `[${this.CLASS_NAME}] `;
    }
}

