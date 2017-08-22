import moment from 'moment';

export function format(date) {
    return moment(date).format('ddd, MMM D');
}

export function getToneString(tones, composeState) {
    const {
        tone,
        date,
        action,
        lang = 'en',
    } = composeState;

    const dateKey = date === 'asap' ? 'asap' : 'date';
    const toneKey = `${lang}.${action}.${tone}.${dateKey}`;
    const toneTemplate = tones[toneKey];

    const formattedDate = format(getUTCDate(composeState.date, composeState.dateValue));
    const toneString = toneTemplate.replace('{date}', formattedDate);

    return toneString;
}

export function needProcessMiddleware(action, middlewareName) {
    const isFieldExist = (action && action.meta && action.meta[middlewareName]);

    return !!isFieldExist;
}

export function getUTCDate(type, value) {
    let regularDate = new Date(Date.now());
    switch (type.toUpperCase()) {
        case 'ASAP':
        case 'TODAY':
            break;
        case 'TOMORROW':
            regularDate.setDate(regularDate.getDate() + 1);
            break;
        case 'PICK DATE':
            // console.error('need to implement pick date');
            regularDate = new Date(value);
            break;
    }
    return Date.parse(
        new Date(regularDate.getFullYear(), regularDate.getMonth(), regularDate.getDate(), 23, 59, 59));
}
