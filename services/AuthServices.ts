"use server";
import { cookies } from "next/headers";
 
export type responseState = {
    success: boolean;
    message: string;
    data?: unknown;
};

async function storeAuthTokenFromResponse(response: Response) {
    const setCookie = response.headers.get("set-cookie");
    if (!setCookie) return;

    const tokenMatch = setCookie.match(/token=([^;]+)/);
    if (!tokenMatch) return;

    const cookieStore = await cookies();
    cookieStore.set("token", tokenMatch[1], {
        httpOnly: true,
        secure: false,        // true in production
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,      // 1h — match JWT expiry
    });
    cookieStore.set("auth", "true", {
        httpOnly: false,      // readable by middleware
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
    });
}
function isEmailOrPhone(emailOrPhone: string): { email: string, phone: string } {
    let email = "";
    let phone = "";
    if (emailOrPhone?.includes("@")) {
        email = emailOrPhone;
    } else {
        phone = emailOrPhone ?? "";
    }
    return { email, phone };
};
// services/index.ts

export const loginWithPasswordService = async (
    prevState: responseState,
    formData: FormData
): Promise<responseState> => {
    const emailOrPhone = formData.get("emailOrPhone") as string | null;
    const password = formData.get("password") as string;

    const { email, phone } = isEmailOrPhone(emailOrPhone as string);
 
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...(email ? { email } : {}),
                ...(phone ? { phone } : {}),  // ✅ fixed: was mangling the phone number
                password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return {
            success: false,
            message: data?.message ?? "Login failed. Please try again.",
        };
    }
 
    await storeAuthTokenFromResponse(response);

    return {
        success: true,
        message: "Login successful!",
        data,
    };
};

export const generateOtpService = async( formData: FormData): Promise<responseState> => {
    const emailOrPhone = formData.get("emailOrPhone") as string | null;
    const { email, phone } = isEmailOrPhone(emailOrPhone as string);
    const purpose = formData.get("purpose") as "login" | "signup" | "forgot-password" | "reset-password" | "verify-email" | "verify-phone";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/generate-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(email ? { email } : {}), ...(phone ? { phone } : {}), purpose }),
    });
    const data = await response.json(); 
    if (!response.ok) {
        return {
            success: false,
            message: data?.message ?? "Generate OTP failed. Please try again.",
        };
    }
    return {
        success: true,
        message: "Generate OTP successful!",
        data,
    };
}

export const verifyOtpService = async( formData: FormData): Promise<responseState> => {
    const emailOrPhone = formData.get("emailOrPhone") as string | null;
    const { email, phone } = isEmailOrPhone(emailOrPhone as string);
    const code = formData.get("otp") as string;
    const purpose = formData.get("purpose") as "register" | "forgot-password" | "reset-password" | "verify-email" | "verify-phone";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(email ? { email } : {}), ...(phone ? { phone } : {}), code, purpose }),
    });
    const data = await response.json();
    if (!response.ok) {
        return {
            success: false,
            message: data?.message ?? "Verify OTP failed. Please try again.",
        };
    }
    return {
        success: true,
        message: "Verify OTP successful!",
        data,
    };
}

export const registerService = async( formData: FormData): Promise<responseState> => {
    const emailOrPhone = formData.get("emailOrPhone") as string | null;
    const { email, phone } = isEmailOrPhone(emailOrPhone as string);
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const purpose = formData.get("purpose") as string | null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...(email ? { email } : {}), ...(phone ? { phone } : {}), password, role, purpose }),
    });
    const data = await response.json();
    if (!response.ok) {
        return {
            success: false,
            message: data?.message ?? "Register failed. Please try again.",
        };
    }
    await storeAuthTokenFromResponse(response);
    return {
        success: true,
        message: "Register successful!",
        data,
    };
}