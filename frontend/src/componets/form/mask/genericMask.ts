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

export interface IConfig {
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
    // let configMaskOptionals = configMask.filter(c => c.type !== 'optional');
    let configMaskOptionals = configMask;

    let valueSplitted = event.target.value.split('');
    if (!valueSplitted[selectionStart]) {
        valueSplitted.push(event.key);
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

export const configAllSetNewValue = ({
    configMask,
    event,
}: {
    configMask: IConfig[];
    event: any;
}) => {
    const newValue = [];
    let valueSplitted = event.target.value.split('');
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

export function genericMask(
    value: string,
    onBlur: boolean,
    event: any,
    setConfigs: (configs: IConfig[]) => void,
    configs: IConfig[],
) {
    const valueSplitted = event.target?.value
        ? event.target.value.replace(/[_]+$/, '').split('')
        : [];

    if (event.code !== 'Backspace' && !event.code.includes('Arrow')) {
        valueSplitted.push(event.key);
    }

    if (event.code === 'Backspace') {
        valueSplitted.splice(1, event.target.selectionStart);
    }

    if (valueSplitted.length === configs.length + 1) {
        configs = configMaskPhone;
        setConfigs(configMaskPhone);

        const { selectionStart } = event.target;
        event.target.value = configAllSetNewValue({
            configMask: configs,
            event,
        });
        event.target.selectionStart = selectionStart;
        event.target.selectionEnd = selectionStart;
    }
    const mask = maskValue3({
        value,
        configMask: configs,
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
