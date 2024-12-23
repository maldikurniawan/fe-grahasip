import CryptoJS from "crypto-js";

export function encrypted(plainText) {
    var key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
    var iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_IV);
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plainText), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });
    var base64 = encrypted.toString();

    // Ubah Base64 ke Base64URL
    var base64url = base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return base64url;
}

export function decrypted(encrypted) {
    if (typeof encrypted !== "string") {
        console.warn("Invalid input type. Expected string.");
        return null; // Early return if input is not a string
    }

    try {
        var base64 =
            encrypted.replace(/-/g, "+").replace(/_/g, "/") +
            "==".substring(0, (3 * encrypted.length) % 4);

        var key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
        var iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_ENCRYPTION_IV);
        var decrypted;
        var decryptedBytes = CryptoJS.AES.decrypt(base64, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
        });
        var decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        decrypted = JSON.parse(decryptedText); //
    } catch (e) {
        // Handle error
        console.error("Error decrypting or parsing JSON:", e);
        return null;
    }
    return decrypted;
}
