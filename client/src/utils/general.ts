import CryptoJS from "crypto-js";

// Función para encriptar un número
export const encryptNumber = (number: number, secret: string): string => {
    return CryptoJS.AES.encrypt(number.toString(), secret).toString();
};

// Función para desencriptar un número
export const decryptNumber = (encryptedNumber: string, secret: string): number => {
    const bytes = CryptoJS.AES.decrypt(encryptedNumber, secret);
    return parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
};