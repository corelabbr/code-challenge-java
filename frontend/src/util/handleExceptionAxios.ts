export const handleExceptionMessage = (error: any): string => {
    if (
        typeof error?.request?.response == 'string' &&
        error?.request?.response.includes('{')
    ) {
        const response = JSON.parse(error.request.response);
        if (response.message) {
            return response.message;
        }
    }
    return '';
};
export const handleExceptionMultipleMessages = (error: any): string[] => {
    if (typeof error?.request?.response == 'string') {
        const response = JSON.parse(error.request.response);
        if (response?.message && typeof response.message == 'string') {
            return [response.message];
        }
        if (response?.message && typeof response.message != 'string') {
            return response.message;
        }
    }
    return [];
};
export const handleExceptionMessageApiNfe = (error: any): string[] => {
    if (typeof error?.request?.response == 'string') {
        const response = JSON.parse(error.request.response);
        if (typeof response.message == 'string') {
            return [response.message];
        }
        if (typeof response.message != 'string') {
            return response.message;
        }
    }
    return [];
};
