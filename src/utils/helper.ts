import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import CommonVariables from "../config/index";
import { decode } from "punycode";

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

// 🔢 Generate 6-digit OTP
export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// 🎫 Generate Access Token (short-lived)
export const generateAccessToken = (payload: { userId: string; email: string; name: string }): string => {
    return jwt.sign(payload, JWT_SECRET, { 
        expiresIn: '1d', // 1 day
        issuer: 'auth-service',
        audience: 'user'
    });
};

// 🔄 Generate Refresh Token (long-lived)
export const generateRefreshToken = (payload: { userId: string; email: string }): string => {
    return jwt.sign(payload, JWT_SECRET, { 
        expiresIn: '15d', // 15 days
        issuer: 'auth-service',
        audience: 'refresh'
    });
};

// ✅ Verify Access Token
export const verifyAccessToken = (token: string): { userId: string; email: string; name: string } | null => {
    try {
       
        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: 'auth-service',
            audience: 'user'
        }) as { userId: string; email: string; name: string };
        
        return decoded;
    } catch (error) {
        console.error("Access token verification failed:", error);
        return null;
    }
};

// ✅ Verify Refresh Token
export const verifyRefreshToken = (token: string): { userId: string; email: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: 'auth-service',
            audience: 'refresh'
        }) as { userId: string; email: string };
        return decoded;
    } catch (error) {
        console.error("Refresh token verification failed:", error);
        return null;
    }
};

// 🍪 Set HTTP-only cookies
export const setAuthCookies = (res: any, refreshToken: string) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: CommonVariables.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/v1/auth/refresh' // Only accessible on refresh endpoint
    });
};

// 🧹 Clear auth cookies
export const clearAuthCookies = (res: any) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/v1/auth/refresh'
    });
};



export function getTodayDateString(date?: Date): string {
    const d = date ? new Date(date) : new Date();
    return d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  }
  

  import moment from 'moment';

export function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = moment().hour(); // gets the current hour in 24-hour format

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night"; // 9 PM – 4:59 AM
}
