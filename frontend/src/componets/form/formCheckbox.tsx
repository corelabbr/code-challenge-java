import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';

const labelProps = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface IFormInputProps {
    name: string;
    control: any;
}

export const FormCheckbox = ({ name, control }: IFormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => {
                return (
                    <Checkbox
                        checked={value}
                        onChange={event => {
                            onChange(event);
                        }}
                    />
                );
            }}
        />
    );
};

// Outra implementação que também funciona
// export const FormCheckbox = ({ name, control }: IFormInputProps) => {
//     return (
//         <FormControlLabel
//             control={
//                 <Controller
//                     name={name}
//                     control={control}
//                     defaultValue={false}
//                     render={({ field: props }) => (
//                         <Checkbox
//                             {...props}
//                             checked={props.value}
//                             onChange={e => props.onChange(e.target.checked)}
//                         />
//                     )}
//                 />
//             }
//             label={'label'}
//         />
//     );
// };
