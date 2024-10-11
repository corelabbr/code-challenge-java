export const message = {
    error: {
        delete: 'Error deleting record',
        deleteAllOrOne: 'Error deleting record(s)',
        selectAll: 'Error selecting record',
        selectOne: 'Error selecting record',
        save: 'Error saving record',
        login: 'Error logging in',
        downloadPdf: 'Error downloading file',
    },
    success: {
        delete: 'Record successfully deleted',
        deleteAllOrOne: 'Record(s) deleted successfully',
        selectAll: '',
        selectOne: '',
        save: 'Record saved successfully',
    },
    warn: {
        save: 'A regra para salvar o registro não foi atendida',
    },
};

export function handleMessageError(
    messageError?: (errors: any, field: any) => string,
    messagesError?: any[],
    errors?: any,
    name?: any,
) {
    if (messageError && errors) {
        return messageError(errors, name);
    }

    if (messagesError && errors) {
        return messagesError.find(m => m.type == errors.type)?.message;
    }

    if (errors && errors.type === 'validate') {
        return errors.message;
    }
}
