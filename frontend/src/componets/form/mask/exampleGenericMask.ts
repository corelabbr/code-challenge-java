import { forEach, values } from 'lodash';
import { ChangeEvent } from 'react';

interface IExample {
    quantity: number;
    type: 'number' | 'letter';
    finalKey?: string;
}
const configsRegex = {
    number: (quantity: number) => (quantity ? `(\\d{${quantity}})` : `(\\d)`),
    letter: (quantity: number) => `([a-zA-Z]{${quantity}})`,
    underline: (quantity: number) =>
        quantity ? `([\\s\\S]{${quantity}})` : `(_)`,
};

const example: IExample[] = [
    // { quantity: 2, type: 'letter', finalKey: '-' },
    // { quantity: 4, type: 'number', finalKey: '.' },
    // { quantity: 1, type: 'number' },
    { quantity: 0, type: 'number', finalKey: '-' },
    { quantity: 4, type: 'number' },
];
const addQuantityCharacters = 5;

let regexExample = '';
let regexReplace = '';
let regexToApplyUnderline = '';
let quantityCharacters = 0;
let listFinalKeys: string[] = [];
example.forEach((e, index) => {
    regexExample += `${configsRegex[e.type](e.quantity)}`;
    regexToApplyUnderline += `${configsRegex['underline'](e.quantity)}`;
    quantityCharacters += e.quantity;
    if (e.finalKey) {
        regexReplace += `$${index + 1}${e.finalKey}`;
        listFinalKeys.push(e.finalKey);
    }
});
regexExample += '$';
regexReplace += `$${example.length}`;
quantityCharacters += addQuantityCharacters;
let regexToRemove: any = '[^0-9]+';
if (example.some(e => e.type === 'letter')) {
    regexToRemove = '[^0-9a-zA-Z]+';
}
regexToRemove = new RegExp(regexToRemove, 'i');

const optional = '[_\\d]{1}';
const upperCaseLetter = '[A-Z]{1}';
const lowerCaseLetter = '[a-z]{1}';
const number = '[\\d{1}]';

function chooseRegexByType({
    type,
    character,
}: {
    type:
        | 'optional'
        | 'upperCaseLetter'
        | 'lowerCaseLetter'
        | 'number'
        | 'character';
    character: string | null;
}) {
    if (type === 'optional') {
        return optional;
    }
    if (type === 'upperCaseLetter') {
        return upperCaseLetter;
    }
    if (type === 'lowerCaseLetter') {
        return lowerCaseLetter;
    }
    if (type === 'number') {
        return number;
    }
    return `[${character}]{1}`;
}

interface IConfig {
    type:
        | 'optional'
        | 'upperCaseLetter'
        | 'lowerCaseLetter'
        | 'number'
        | 'character';
    character: string | null;
}

export const configMaskPhone: IConfig[] = [
    { type: 'optional', character: null },
    { type: 'number', character: null },
    { type: 'number', character: null },
    { type: 'number', character: null },
    { type: 'number', character: null },
    { type: 'character', character: '-' },
    { type: 'number', character: null },
    { type: 'number', character: null },
    { type: 'number', character: null },
    { type: 'number', character: null },
];

export function applyInitialValue(newConfig: IConfig[]): string {
    let mask = '';
    const arrToIgnore = ['optional', ''];
    const arrNotIgnore = ['number', 'upperCaseLetter', 'lowerCaseLetter'];
    newConfig.forEach(c => {
        if (c.type === 'character') {
            mask += c.character;
        }
        if (arrNotIgnore.includes(c.type)) {
            mask += '_';
        }
    });
    return mask;
}

function setCharAt(str: any, index: any, chr: any) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function maskValue({
    value,
    configMask,
    selectionStart,
}: {
    value: any;
    configMask: IConfig[];
    selectionStart: number;
}) {
    if (!value) {
        return {
            value: applyInitialValue(configMask),
            length: 0,
        };
    }

    let valueSplitted = value.split('');
    let configMaskOptionals = configMask.filter(c => c.type !== 'optional');

    if (!value.includes('_')) {
        for (const idx in configMaskOptionals) {
            if (configMaskOptionals[idx].character) {
                valueSplitted.push(configMaskOptionals[idx].character);
                continue;
            }
            if (!valueSplitted[idx]) {
                valueSplitted.push('_');
            }
        }
        valueSplitted.splice(selectionStart + 1, 0, '_');
    }

    const config = configMaskOptionals[selectionStart];
    if (value.length > configMaskOptionals.length && !value.includes('_')) {
        return { value: value.slice(0, -1), length: 0 };
    }

    let idxToRemove = -1;

    for (const idx in valueSplitted) {
        if (Number(idx) >= selectionStart && valueSplitted[idx] == '_') {
            idxToRemove = Number(idx);
        }

        if (idxToRemove != -1) {
            break;
        }
    }

    if (idxToRemove >= 0) {
        valueSplitted.splice(idxToRemove, 1);
    }

    value = valueSplitted.join('');

    let isValid = true;
    valueSplitted.forEach((v: any, idx: number) => {
        const validRegex = new RegExp(
            chooseRegexByType({
                type: configMaskOptionals[idx].type,
                character: configMaskOptionals[idx].character,
            }),
            'i',
        );

        if (!validRegex.test(v) && v !== '_') {
            valueSplitted[idx] = '_';
            isValid = false;
        }
    });

    if (isValid) {
        isValid = !value.includes('_');
    }

    if (!isValid) {
        value = value.replaceAll('-', '');

        valueSplitted = value.split('');

        valueSplitted.splice(4, 0, '-');

        const addLength = config.character ? 1 : 0;

        const newValue = valueSplitted.join('');
        return { value: newValue, length: addLength > 0 ? 4 + addLength : 0 };
    }

    return { value: value, length: 0 };
}

interface IKeyPress {
    keyPress?: string;
}
function maskValue2({
    value,
    configMask,
    event,
}: {
    value: any;
    configMask: IConfig[];
    event?: ChangeEvent<HTMLInputElement & IKeyPress>;
}) {
    if (!value) {
        return {
            value: applyInitialValue(configMask),
            length: 0,
        };
    }

    const selectionStart = event?.target?.selectionStart || 0;

    const keyMask = '_';
    let configMaskOptionals = configMask.filter(c => c.type !== 'optional');
    let addSelectionStart = 0;

    let valueSplitted = value.split('');
    let newValueSplitted: any[] = [];
    newValueSplitted.push(...valueSplitted);

    if (event?.target?.keyPress === 'Backspace') {
        if (configMaskOptionals[selectionStart]?.type === 'character') {
            // addSelectionStart = 1;
            newValueSplitted.splice(
                selectionStart,
                0,
                configMaskOptionals[selectionStart].character,
            );
        } else {
            newValueSplitted.splice(selectionStart, 0, keyMask);
        }

        return {
            value: newValueSplitted.join(''),
            length: selectionStart + addSelectionStart,
        };
    }

    newValueSplitted = [...configMaskOptionals];

    const oldSelectionStart = selectionStart - 1;
    if (
        configMaskOptionals[selectionStart - 1]?.type === 'character' &&
        oldSelectionStart === selectionStart - 1 &&
        valueSplitted[selectionStart] ===
            configMaskOptionals[selectionStart - 1].character
    ) {
        const keepCharacter = valueSplitted[oldSelectionStart];
        valueSplitted[selectionStart] = valueSplitted[oldSelectionStart];
        valueSplitted[oldSelectionStart] = keepCharacter;
        addSelectionStart = 1;
    }

    const oldValueSplitted =
        event?.currentTarget?.defaultValue?.split('') || [];
    if (oldValueSplitted[selectionStart - 1] === keyMask) {
        valueSplitted.splice(selectionStart - 1, 1);
    }

    configMaskOptionals.forEach((config, idx) => {
        const { type, character } = configMaskOptionals[idx];

        if (!valueSplitted[idx] && type !== 'character') {
            newValueSplitted[idx] = keyMask;
        } else if (type === 'character') {
            newValueSplitted[idx] = character;
        } else {
            const validRegex = new RegExp(
                chooseRegexByType({
                    type: type,
                    character: character,
                }),
                'i',
            );

            if (!validRegex.test(valueSplitted[idx])) {
                newValueSplitted[idx] = keyMask;
            } else {
                newValueSplitted[idx] = valueSplitted[idx];
            }
        }
    });

    if (newValueSplitted.length > configMaskOptionals.length) {
        return {
            value: newValueSplitted
                .filter((_, idx) => idx < configMaskOptionals.length)
                .join(''),
            length: selectionStart,
        };
    }

    if (configMaskOptionals[selectionStart]?.type === 'character') {
        addSelectionStart = 1;
    }

    return {
        value: newValueSplitted.join(''),
        length: selectionStart + addSelectionStart,
    };
}

function maskValue3({
    value,
    configMask,
    event,
}: {
    value: any;
    configMask: IConfig[];
    event: any;
}) {
    if (!value) {
        return {
            value: applyInitialValue(configMask),
            length: 0,
        };
    }

    if (event.code.includes('Arrow')) {
        return {
            action: 'continue',
            selectionStart: event.target.selectionStart,
        };
    }

    if (
        event.code !== `Key${event.key.toUpperCase()}` &&
        event.code !== `Digit${event.key.toUpperCase()}` &&
        !/Numpad(\d+)/g.test(event.code) &&
        event.code !== 'Backspace'
    ) {
        return {
            action: 'InvalidKey',
            selectionStart: event.target.selectionStart,
        };
    }

    let selectionStart = event?.target?.selectionStart || 0;
    let configMaskOptionals = configMask.filter(c => c.type !== 'optional');

    let valueSplitted = event.target.value.split('');
    if (!valueSplitted[selectionStart]) {
        valueSplitted.push(event.key);
    }

    if (event.code === 'Backspace') {
        valueSplitted[selectionStart] = event.key;
    }

    const config = configMaskOptionals[selectionStart];

    if (!config && event.code !== 'Backspace') {
        return {
            action: 'back',
            selectionStart,
        };
    }

    if (event.code === 'Backspace' && configMaskOptionals[selectionStart - 1]) {
        let newSelectionStart = selectionStart;
        if (configMaskOptionals[selectionStart - 1].character) {
            newSelectionStart = selectionStart - 1;
        }
        return {
            action: 'continue',
            selectionStart: newSelectionStart,
        };
    }

    let { type, character } = config;

    if (character) {
        const findNext = configMaskOptionals.findIndex(
            (item, index) =>
                index > selectionStart && item.type !== 'character',
        );

        if (findNext >= 0) {
            const configCharacter = configMaskOptionals[findNext];
            type = configCharacter.type;
            character = configCharacter.character;
        }
        selectionStart += 1;
    }

    const validRegex = new RegExp(
        chooseRegexByType({
            type: type,
            character: character,
        }),
        'i',
    );
    if (!validRegex.test(event.key)) {
        return {
            action: 'back',
            selectionStart,
        };
    }

    return {
        action: 'continue',
        selectionStart,
    };
}

export function phoneMask(
    value: string,
    onBlur: boolean,
    event?: ChangeEvent<HTMLInputElement>,
) {
    if (onBlur) {
        if (!(value?.length >= quantityCharacters)) {
            return '';
        }
    }
    // Remove tudo o que não é dígito
    if (!value) {
        value = '';
    }
    value = value.replace(regexToRemove, '');

    const length = value.length;
    const missingChars = quantityCharacters - value.length;
    if (missingChars > 0) {
        const underlines = '_'.repeat(missingChars);
        const formattedValue = value + underlines;

        // Aplica o formato desejado (_____-____)
        value =
            formattedValue.substring(0, 4) +
            '-' +
            formattedValue.substring(4, 10);
    }

    if (value.length > quantityCharacters) {
        value = value.substring(0, quantityCharacters);
    }

    // regexExample = '(\\d{4})(\\d{4})$';
    const validRegex = new RegExp(regexExample, 'i');

    value = value.replace(validRegex, regexReplace);

    return value;
}

export function phoneMaskTest(
    value: string,
    onBlur: boolean,
    event?: ChangeEvent<HTMLInputElement & IKeyPress>,
) {
    if (onBlur) {
        if (!(value?.length >= quantityCharacters)) {
            // return { value: '', length: 0 };
        }
    }
    const mask = maskValue2({
        value,
        configMask: configMaskPhone,
        event: event,
    });

    return {
        value: mask.value,
        length:
            mask.length > 0 ? mask.length : event?.target?.selectionStart || 0,
    };
}

export function phoneMaskTes3(value: string, onBlur: boolean, event: any) {
    const configAllSetNewValue = ({
        configMask,
        valueSplitted,
    }: {
        configMask: IConfig[];
        valueSplitted: string[];
    }) => {
        const newValue = [];
        for (const indexConfig in configMask) {
            const config = configMask[indexConfig];

            if (config?.character) {
                const nextIndexCharacter = valueSplitted.findIndex(
                    (v: string, index: number) =>
                        index <= Number(indexConfig) && v === config.character,
                );

                if (nextIndexCharacter >= 0) {
                    newValue.push(config.character);
                    const auxValue1 = valueSplitted[nextIndexCharacter];
                    const auxValue2 = valueSplitted[indexConfig];
                    valueSplitted[nextIndexCharacter] = auxValue2;
                    valueSplitted[indexConfig] = auxValue1;
                }
            }
        }
        return valueSplitted.join('');
    };

    const valueSplitted = event.target?.value
        ? event.target.value.split('')
        : [];
    valueSplitted.push(event.key);

    let configMaskOptionals = configMaskPhone.filter(
        c => c.type !== 'optional',
    );
    if (valueSplitted.length === configMaskOptionals.length + 1) {
        configMaskOptionals = configMaskPhone;

        event.target.value = configAllSetNewValue({
            configMask: configMaskOptionals,
            valueSplitted,
        });
    }
    const mask = maskValue3({
        value,
        configMask: configMaskPhone,
        event: event,
    });

    if (mask.action === 'back') {
        return {
            action: 'InvalidKey',
            selectionStart: event.target.selectionStart,
        };
    }

    return {
        ...mask,
    };
}

function applyValue({
    value,
    quantityCharacters,
    regexToApplyUnderline,
    listFinalKeys,
}: {
    value: any;
    quantityCharacters: number;
    regexToApplyUnderline: string;
    listFinalKeys: string[];
}) {
    let newValue = '';
    if (!value) {
        for (let i = 0; i < quantityCharacters; i++) {
            newValue += '_';
        }

        const validRegex = new RegExp(regexToApplyUnderline, 'i');

        return newValue.replace(validRegex, regexReplace);
    }
    value = value.toString();
    const lengthValue = value.length;

    newValue += value;
    const listIndexes: any[] = [];
    listFinalKeys.forEach(finalKey => {
        const indexOf = newValue.indexOf(finalKey);
        if (indexOf >= 0) {
            listIndexes.push({ index: indexOf, finalKey: finalKey });
        }
    });
    for (let i = 0; i < quantityCharacters - lengthValue; i++) {
        newValue += '_';
    }

    if (listIndexes.length > 0 && listIndexes.length === listFinalKeys.length) {
        return newValue;
    }

    listFinalKeys.forEach(finalKey => {
        newValue = newValue.replace(finalKey, '');
    });
    const validRegex = new RegExp(regexToApplyUnderline, 'i');
    newValue = newValue.replace(validRegex, regexReplace);

    const values = newValue.split('');
    listIndexes.forEach(item => {
        values.splice(item.index + 1, 0, item.finalKey);
    });
    return values.join('');
}
