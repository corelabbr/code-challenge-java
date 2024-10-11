interface IDisplayRows {
    from: any;
    to: any;
    count: any;
}

export const defaultLabelDisplayedRows = ({
    from,
    to,
    count,
}: IDisplayRows) => {
    return `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`;
};
