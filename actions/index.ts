"use server";
import { loginWithPasswordService, registerService } from "@/services/index";

export type responseState = {
    success: boolean;
    message: string;
    data?: unknown;
    error?: string | null | unknown;
};

 
export const loginWithPasswordAction = async (
    prevState: responseState,
    formData: FormData
): Promise<responseState> => {
    const emailOrPhone = formData.get("emailOrPhone") as string | null;
    const password = formData.get("password") as string;

    // Basic validation
    if (!password || (!emailOrPhone)) {
        return {
            success: false,
            message: "Please provide a password and either an email or phone.",
        };
    }

    try {
        const response = await loginWithPasswordService(prevState, formData);

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Network error. Please check your connection.",
        };
    }
};
//generate otp

export const registerAction = async (
    prevState: responseState,
    formData: FormData
): Promise<responseState> => {
    const emailOrPhone = formData.get("emailOrPhone") as string | null;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string | null;
    const purpose = formData.get("purpose") as string | null;
 console.log(emailOrPhone, password, role, purpose, "emailOrPhone, password, role, purpose");
    if (!emailOrPhone || !password || !role || !purpose  ) {
        return {
            success: false,
            message: "Please fill all the fields",
            error: "Please fill all the fields",
        };
    }
    try {
        const response = await registerService(formData);
        return response;
    } catch (error) {
        console.error("Register error:", error);
        return {
            success: false,
            message: "Network error. Please check your connection.",
        };
    }
}       