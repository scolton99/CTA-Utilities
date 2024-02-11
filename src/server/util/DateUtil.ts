export const parseBusDate = (busDateTimeString: string): Date => {
    const chicagoTzOffset = Intl.DateTimeFormat('ia', {
        timeZoneName: 'short',
        timeZone: 'America/Chicago'
    });

    const chicagoIaTzPair = chicagoTzOffset.formatToParts().find(it => it.type === 'timeZoneName');
    if (!chicagoIaTzPair)
        throw new Error('Error fetching current Chicago UTC offset!');

    const chicagoIaTzName = chicagoIaTzPair.value;
    const chicagoTzOffsetStr = chicagoIaTzName.substr(3);

    const chicagoTzOffsetSign = chicagoTzOffsetStr.substr(0, 1);
    const chicagoTzOffsetHrs = '0' + chicagoTzOffsetStr.substr(1);

    const [ dateString, timeString ] = busDateTimeString.split(' ');

    const year = dateString.substr(0, 4);
    const month = dateString.substr(4, 2);
    const day = dateString.substr(6, 2);

    const [ hour, minute, second ] = timeString.split(':');

    const iso8601DateStr = `${year}-${month}-${day}T${hour}:${minute}:${second}${chicagoTzOffsetSign}${chicagoTzOffsetHrs}:00`;

    return new Date(iso8601DateStr);
};