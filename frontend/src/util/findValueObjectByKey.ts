export const findVal = (object: any, key: any) => {
    var value;
    Object.keys(object).some(function (k) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findVal(object[k], key);
            return value !== undefined;
        }
    });
    return value;
};

export const resolveValueObject = (path: string, obj: any) => {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
    }, obj);
};
