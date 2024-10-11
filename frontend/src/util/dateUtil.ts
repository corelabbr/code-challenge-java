import moment, { unitOfTime } from 'moment-timezone';

interface ImomentZoneToDateAddDays {
    days: number;
    date?: Date;
    endOfType?: string;
    startOfType?: string;
}

export function formatDate(date: undefined | Date): string {
    if (date) {
        return momentDate(date).format('DD/MM/YYYY HH:mm');
    }
    return momentDate(undefined).format('DD/MM/YYYY HH:mm');
}

export function formatUnixDate(number: number): string {
    if (number) {
        return moment.unix(number).format('DD/MM/YYYY');
    }
    return '';
}

export function unixToDate(number: number): Date {
    if (number) {
        return moment.unix(number).tz('America/Sao_Paulo').toDate();
    }
    return moment().tz('America/Sao_Paulo').toDate();
}

export function formatDateWithoutHours(date: undefined | Date): string {
    if (date) {
        return momentDate(date).format('DD/MM/YYYY');
    }
    return momentDate(undefined).format('DD/MM/YYYY');
}

export function momentDate(date: undefined | Date) {
    if (date) {
        return moment(date).tz('America/Sao_Paulo');
    }
    return moment().tz('America/Sao_Paulo');
}

export function momentDiff(
    dateEnd: Date,
    type: unitOfTime.Diff,
    dateStart?: Date,
) {
    if (dateStart) {
        return moment(dateStart).startOf('day').diff(moment(dateEnd), type);
    }
    return moment(dateEnd).diff(moment().startOf('day'), type);
}

export function momentZone() {
    return moment().tz('America/Sao_Paulo').toDate();
}

export function momentZoneToDateAddDays({
    days,
    date,
    endOfType,
    startOfType,
}: ImomentZoneToDateAddDays) {
    let momentTemp = null;
    if (date) {
        momentTemp = moment(date).tz('America/Sao_Paulo').add(days, 'days');
    } else {
        momentTemp = moment().tz('America/Sao_Paulo').add(days, 'days');
    }

    if (endOfType && endOfType == 'day') {
        momentTemp = momentTemp.endOf('day');
    }

    if (startOfType && startOfType == 'day') {
        momentTemp = momentTemp.startOf('day');
    }
    return momentTemp.toDate();
}

export function momentZoneToDate(date: undefined | Date) {
    if (date) {
        return moment(date).tz('America/Sao_Paulo').toDate();
    }
    return moment().tz('America/Sao_Paulo').toDate();
}

export function momentZoneToUnix(date: undefined | Date | null) {
    if (date) {
        return moment(date).tz('America/Sao_Paulo').unix();
    }
    return moment().tz('America/Sao_Paulo').unix();
}

export function isValidDate(date: Date) {
    return moment(date).isValid();
}
