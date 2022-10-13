import CryptoJS from "crypto-js";

const cipher = (text: string) => {
  const passphrase = import.meta.env.VITE_PASSPHRASE;
  return CryptoJS.AES.encrypt(text, passphrase||"eddytesting if it works").toString();
};

const decipher = (ciphertext: string) => {
  const passphrase = import.meta.env.VITE_PASSPHRASE;
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export { cipher, decipher };
