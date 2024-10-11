import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface DialogProps {
    handleConfirmation: (openDialog: boolean) => void;
    open: boolean;
    messageDialogTitle?: string;
    handleCloseProps?: () => void;
    messageDetail?: string;
}

const AlertDialog: React.FC<DialogProps> = ({
    handleConfirmation,
    open,
    messageDialogTitle,
    handleCloseProps,
    messageDetail,
}) => {
    const handleClose = () => {
        if (handleCloseProps) {
            handleCloseProps();
        } else {
            handleConfirmation(false);
        }
    };

    const handleConfirmDeleteComponent = () => {
        handleConfirmation(true);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {messageDialogTitle ||
                        'Tem certeza que deseja excluir o registro?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        dangerouslySetInnerHTML={{
                            __html:
                                messageDetail ||
                                `Clique em sim para confirmar.`,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Não
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmDeleteComponent}
                        autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;
