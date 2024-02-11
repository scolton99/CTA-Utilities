export const getStationId = (): number => {
    return parseInt(getStopId());
};

export const getStopId = (): string => {
    const domElement = document.querySelector('meta[name=\'station_id\']');

    if (!domElement)
        throw new Error('Missing station ID meta element.');

    const rawValue = domElement.getAttribute('content');

    if (!rawValue)
        throw new Error('Station ID meta element is missing content attribute.');

    return rawValue;
};
