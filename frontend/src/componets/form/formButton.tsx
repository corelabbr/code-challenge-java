import {
    AddCircle,
    CancelPresentation,
    ClearAll,
    Cached,
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, ButtonProps, SvgIconProps } from '@mui/material';
import React from 'react';

interface IButtonProps extends ButtonProps {
    label: string;
    typeButton?:
        | 'delete'
        | 'submit'
        | 'cancel'
        | 'addRegister'
        | 'search'
        | 'clear'
        | 'toLoad'
        | 'custom';
    icon?: React.ReactElement<SvgIconProps>;
}

const removePropertyTypeButton = (properties: IButtonProps) => {
    const newProperties = { ...properties };
    delete newProperties.typeButton;
    return newProperties;
};

export const FormButton = React.forwardRef<HTMLButtonElement, IButtonProps>(
    (buttonProps, ref) => {
        const properties = removePropertyTypeButton(buttonProps);
        if (buttonProps.typeButton === 'cancel') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    startIcon={<CancelPresentation />}
                    onClick={buttonProps.onClick}>
                    {buttonProps.label}
                </Button>
            );
        }

        if (buttonProps.typeButton === 'delete') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={buttonProps.onClick}>
                    {buttonProps.label}
                </Button>
            );
        }

        if (buttonProps.typeButton === 'submit') {
            let buttonIcon = <SaveIcon />;
            if (buttonProps.icon) {
                buttonIcon = buttonProps.icon;
            }
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    type="submit"
                    color="secondary"
                    onClick={buttonProps.onClick}
                    startIcon={buttonIcon}>
                    {buttonProps.label}
                </Button>
            );
        }

        if (buttonProps.typeButton === 'addRegister') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    startIcon={<AddCircle />}>
                    {buttonProps.label}
                </Button>
            );
        }

        if (buttonProps.typeButton === 'search') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    startIcon={<SearchOutlinedIcon />}>
                    {buttonProps.label}
                </Button>
            );
        }
        if (buttonProps.typeButton === 'clear') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    startIcon={<ClearAll />}>
                    {buttonProps.label}
                </Button>
            );
        }
        if (buttonProps.typeButton === 'toLoad') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant="contained"
                    startIcon={<Cached />}>
                    {buttonProps.label}
                </Button>
            );
        }
        if (buttonProps.typeButton === 'custom') {
            return (
                <Button
                    ref={ref}
                    {...properties}
                    variant={buttonProps.variant}
                    startIcon={buttonProps.icon}>
                    {buttonProps.label}
                </Button>
            );
        }
        return <></>;
    },
);
