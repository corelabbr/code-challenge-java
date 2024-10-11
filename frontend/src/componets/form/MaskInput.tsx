import React, { useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

const MaskedInput: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Obtém o valor do campo de entrada
        let inputValue = event.target.value;

        // Salva a posição do cursor antes da mudança
        const selectionStart = event.target.selectionStart;

        // Remove caracteres que não são números
        inputValue = inputValue.replace(/\D/g, '');

        // Adiciona underline para os próximos dígitos
        let maskedValue = '';
        let i = 0;
        for (i = 0; i < inputValue.length && i < 3; i++) {
            maskedValue += inputValue[i];
        }
        for (; i < 3; i++) {
            maskedValue += '_';
        }
        maskedValue += ',';

        for (; i < inputValue.length && i < 6; i++) {
            maskedValue += inputValue[i];
        }
        for (; i < 6; i++) {
            maskedValue += '_';
        }

        // Atualiza o estado com o valor mascarado
        setValue(maskedValue);

        // Salva a posição do cursor para restaurá-la após a mudança
        setCursorPosition(selectionStart);
    };

    return (
        <TextField
            label="Digite algo"
            variant="outlined"
            value={value}
            onChange={handleChange}
            inputProps={{
                inputMode: 'numeric',
                maxLength: 8,
                spellCheck: 'false',
                style: { textAlign: 'right' },
                ref: (input: any) =>
                    input &&
                    cursorPosition !== null &&
                    input.setSelectionRange(cursorPosition, cursorPosition),
            }} // Limita o comprimento total do valor
        />
    );
};

export default MaskedInput;
