import moment from 'moment';
import api from './api';

export interface IDataReport {
    nameReport: string;
    params: any;
    setLoading?: (loading: boolean) => void;
}

function base64ToArrayBuffer(base64: any) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export const downloadReport = async ({
    nameReport,
    params,
    setLoading,
}: IDataReport) => {
    try {
        const response = await api.get(`reports?nameReport=${nameReport}`, {
            responseType: 'arraybuffer',
            params,
        });

        let typeArchive = 'pdf';
        if (params.type) {
            typeArchive = params.type;
        }
        const blob = new Blob([response.data], {
            type: `application/${typeArchive}`,
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${nameReport}_${moment().format(
            'YYYYMMDDHmmss',
        )}.${typeArchive}`;
        link.click();
    } catch (error) {
        setLoading && setLoading(false);
        throw new Error(String(error));
    }
};
