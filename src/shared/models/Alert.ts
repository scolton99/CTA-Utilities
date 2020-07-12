export default abstract class Alert {
    start: Date;
    end: Date;

    icon: string;

    id: number;

    headline: string;
    description: string;
    impact: string;

    timestamp_string = (): string => {
        const date_options = {
            weekday: "short",
            month: "short",
            day: "2-digit"
        };

        const time_options = {
            hour: "numeric",
            minute: "2-digit"
        };

        const start_date = this.start.toLocaleDateString("en-US", date_options);
        const start_time = this.start.toLocaleTimeString("en-US", time_options)
            .replace(/\s/g, "");

        if (this.end === null || this.end.getTime() === 0) {
            return `(${start_date} ${start_time} &mdash; ??)`;
        }

        const end_date = this.end.toLocaleDateString("en-US", date_options);
        const end_time = this.end.toLocaleTimeString("en-US", time_options);

        return end_date === start_date ? `(${start_date} ${start_time} &mdash; ${end_time})` : `(${start_date} ${start_time} &mdash; ${end_date} ${end_time})`;
    };
}