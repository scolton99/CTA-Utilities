export interface AlertJSON {
    start:       Date,
    end:         Date | null,
    icon:        string,
    id:          number,
    headline:    string,
    description: string,
    impact:      string
}

export default abstract class Alert {
    protected start: Date;
    protected end:   Date | null;
    
    protected icon: string;
    
    protected id: number;
    
    protected headline:    string;
    protected description: string;
    protected impact:      string;

    public timestampString(): string {
        const dateOptions: Readonly<Record<string, string>> = {
            weekday: 'short',
            month:   'short',
            day:     '2-digit'
        };

        const timeOptions: Readonly<Record<string, string>> = {
            hour:   'numeric',
            minute: '2-digit'
        };

        const startDate = this.start.toLocaleDateString('en-US', dateOptions);
        const startTime = this.start.toLocaleTimeString('en-US', timeOptions)
            .replace(/\s/g, '');

        if (this.end === null || this.end.getTime() === 0) {
            return `(${startDate} ${startTime} &mdash; ??)`;
        }

        const endDate = this.end.toLocaleDateString('en-US', dateOptions);
        const endTime = this.end.toLocaleTimeString('en-US', timeOptions);

        return endDate === startDate ? `(${startDate} ${startTime} &mdash; ${endTime})` : `(${startDate} ${startTime} &mdash; ${endDate} ${endTime})`;
    }
}