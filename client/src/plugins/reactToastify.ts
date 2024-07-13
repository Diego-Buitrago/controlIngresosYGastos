import { toast, Id } from 'react-toastify';

export interface AxiosError extends Error {
    response?: {
        data?: {
            message: string;
        };
        status?: number;
    };
    request?: XMLHttpRequest
}


export const toastSuccess = (message: string): Id => toast.success(message);

export const toastInfo = (message: string): Id => toast.info(message);

export const toastError = (message: string): Id => toast.error(message);

export const toastApiError = (error: AxiosError): Id => {
    if (error.response && error.response.data && error.response.data?.message) {
        console.error('Respuesta de error de API:', error.response);
        return toast.error(error.response.data.message);
    } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
        return toast.error("No se recibió respuesta del servidor");
    } else {
        console.error('Error inesperado:', error.message);
        return toast.error(error.message || "Error desconocido");
    }
};
