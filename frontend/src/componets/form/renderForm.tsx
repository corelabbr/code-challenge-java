import { Grid, Tooltip, Typography } from '@mui/material';
import { FormInputProps } from './formInterfaces';
import { FormInputNumber } from './formInputNumber';
import { FormAutocompleteInitialized } from './formAutocompleteInitialized';
import { FormInputText } from './formInputText';
import { FormInputDate } from './formInputDate';
import { TableGeneric } from '../table';
import { FormButton } from './formButton';
import { FormCheckbox } from './formCheckbox';
import { FormAutocompleteMultiple } from './formAutocompleteMultiple';
import { Fragment } from 'react';
import { FormInputDateWithoutHour } from './formInputDateWithoutHour';

interface IRenderForm<T extends object> {
    inputsForm: FormInputProps<T>[];
    data?: T;
}

const RenderTypeInputComponent = ({
    field,
    data,
}: {
    field: any;
    data: any;
}) => {
    if (
        field.componentProps?.conditionRender &&
        field.componentProps?.componentData
    ) {
        return field.componentProps.componentData(data);
    }

    if (
        field.componentProps?.conditionRender &&
        field.componentProps?.component
    ) {
        return field.componentProps.component;
    }
    return <></>;
};

export const RenderForm = <T extends object>({
    inputsForm,
    data,
}: IRenderForm<T>) => {
    return (
        <>
            {inputsForm.map((field, index) => {
                // field.name = field.name.replace('.', '');
                let children = <></>;

                if (!field?.control) return <Fragment key={index} />;
                if (
                    field.typeInput === 'number' &&
                    (field.decimalScale || field.decimalScale === 0)
                ) {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormInputNumber
                                name={field.name}
                                readOnly={field?.readOnly}
                                rules={field.rules}
                                control={field.control}
                                label={field.label}
                                decimalScale={field.decimalScale}
                                messagesError={field?.messagesError}
                                handleOnBlur={field?.handleOnBlur}
                                handleChange={field?.handleChange}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'autocomplete' && !field?.multiple) {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormAutocompleteInitialized
                                key={index}
                                name={field.name}
                                readOnly={field?.readOnly}
                                control={field.control}
                                label={field.label}
                                loading={field.loadingAutocomplete || false}
                                options={field.options || []}
                                setValue={field.setValue}
                                handleChange={field.handleChange}
                                variant={field.variant}
                                handleOnKeyPress={field.handleOnKeyPress}
                                rules={field.rules}
                                messagesError={field?.messagesError}
                                actionOnInput={field?.actionOnInput}
                                handleOnBlur={field?.handleOnBlur}
                                activeDebounce={field?.activeDebounce}
                                query={field?.query}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'autocomplete' && field.multiple) {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormAutocompleteMultiple
                                key={index}
                                name={field.name}
                                readOnly={field?.readOnly}
                                control={field.control}
                                label={field.label}
                                options={field.options || []}
                                setValue={field.setValue}
                                handleChange={field.handleChange}
                                variant={field.variant}
                                handleOnKeyPress={field.handleOnKeyPress}
                                rules={field.rules}
                                messagesError={field?.messagesError}
                                handleOnBlur={field?.handleOnBlur}
                                activeDebounce={field?.activeDebounce}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'date') {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormInputDate
                                name={field.name}
                                control={field.control}
                                rules={field.rules}
                                label={field.label}
                                setValue={field.setValue}
                                fullWidth={true}
                                placeholder={field.placeholder}
                                messagesError={field?.messagesError}
                                inputFormat={field?.inputFormat}
                                handleChange={field?.handleChange}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'dateHour') {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormInputDateWithoutHour
                                name={field?.name}
                                control={field?.control}
                                rules={field?.rules}
                                label={field?.label}
                                setValue={field?.setValue}
                                fullWidth={field?.fullWidth || false}
                                setError={field?.setError}
                                clearErrors={field?.clearErrors}
                                handleChange={field?.handleChange}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'text') {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormInputText
                                readOnly={field?.readOnly}
                                name={field.name}
                                rules={field.rules}
                                control={field.control}
                                label={field.label}
                                messagesError={field?.messagesError}
                                actionOnInput={field?.actionOnInput}
                                handleOnBlur={field?.handleOnBlur}
                                mask={field.mask}
                                autoFocus={field?.autoFocus}
                                setValue={field?.setValue}
                                defaultValue={field?.defaultValue}
                                multiline={field?.multiline}
                                variant={field?.variant}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'password') {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <FormInputText
                                type={'password'}
                                readOnly={field?.readOnly}
                                name={field.name}
                                rules={field.rules}
                                control={field.control}
                                label={field.label}
                                messagesError={field?.messagesError}
                                actionOnInput={field?.actionOnInput}
                                handleOnBlur={field?.handleOnBlur}
                                mask={field.mask}
                                autoFocus={field?.autoFocus}
                                setValue={field?.setValue}
                            />
                        </Grid>
                    );
                }
                if (field.typeInput === 'checkbox') {
                    children = (
                        <Grid
                            key={index}
                            item
                            md={field.md}
                            xs={field.xs}
                            display={
                                field?.show === false ? 'none' : undefined
                            }>
                            {field.label}:{''}
                            <FormCheckbox
                                name={field.name}
                                control={field.control}
                            />
                        </Grid>
                    );
                }
                if (
                    field.typeInput === 'subForm' &&
                    field.dataTable?.propsTable.data &&
                    field.control &&
                    field?.useDynamicFieldArray
                ) {
                    let { fields } = field.useDynamicFieldArray;

                    children = (
                        <>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        flex: '1 1 100%',
                                        fontSize: '16px',
                                        pb: 1,
                                    }}
                                    variant="h6"
                                    id={field.name}
                                    component="div">
                                    <FormButton
                                        label={'Adicionar'}
                                        typeButton={'addRegister'}
                                        onClick={() => {
                                            if (
                                                field.dataTable
                                                    ?.handleNewItemTable
                                            ) {
                                                field.dataTable.handleNewItemTable();
                                            } else {
                                                field?.setOpenModal &&
                                                    field?.setOpenModal(true);
                                                field?.setIndex &&
                                                    field.setIndex(-1);
                                            }
                                        }}
                                    />
                                </Typography>
                                <Typography
                                    sx={{ flex: '1 1 100%', fontSize: '16px' }}
                                    variant="h6"
                                    id={field.name}
                                    component="div">
                                    {field.label}
                                </Typography>
                            </Grid>
                            <Grid key={index} item md={field.md} xs={field.xs}>
                                <TableGeneric
                                    data={fields}
                                    columns={
                                        field.dataTable?.propsTable.columns
                                    }
                                    minWidth={
                                        field.dataTable?.propsTable.minWidth
                                    }
                                />
                            </Grid>
                        </>
                    );
                }
                if (field.typeInput === 'component') {
                    children = (
                        <Grid key={index} item md={field.md} xs={field.xs}>
                            <RenderTypeInputComponent
                                field={field}
                                data={data}
                            />
                        </Grid>
                    );
                }

                if (field.toolTipPros) {
                    children = (
                        <Tooltip
                            title={field.toolTipPros.title}
                            arrow={field.toolTipPros.arrow}>
                            {children}
                        </Tooltip>
                    );
                }
                return children;
            })}
        </>
    );
};

export default RenderForm;
