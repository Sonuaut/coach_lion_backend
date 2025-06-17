import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import CommonVariables from "../config/index";

export const HashedPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const ComparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

const JWT_SECRET = CommonVariables.JWT_SECRET;
const ENCRYPTION_KEY = CommonVariables.ENCRYPTION_KEY.padEnd(32, "0"); // Ensure 32-byte key
const IV_LENGTH = 16; // AES block size

// 🔐 Encrypt Data
const encryptData = (data: { _id: string; role: string }): string => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);

    const dataString = JSON.stringify(data);
    let encrypted = cipher.update(dataString, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
};

// 🔓 Decrypt Data
const decryptData = (encryptedData: string): { _id: string; role: string } | null => {
    try {
        const [ivHex, encryptedHex] = encryptedData.split(":");
        const iv = Buffer.from(ivHex, "hex");
        const encryptedText = Buffer.from(encryptedHex, "hex"); // Convert to Buffer

        const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText); // No encoding needed
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString("utf-8")); // Ensure valid JSON
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

// 🏷️ Generate Token with Encrypted Data
export const generateToken = (data: { _id: string; role: string }): string => {
    const encryptedData = encryptData(data);
    return jwt.sign({ data: encryptedData }, JWT_SECRET as string, { expiresIn: "7d" });
};

// ✅ Verify Token and Decrypt Data
export const verifyToken = (token: string): { _id: string; role: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as { data: string };
        return decryptData(decoded.data);;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};
