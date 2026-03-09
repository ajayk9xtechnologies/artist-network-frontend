"use server"
export const loginWithPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    console.log(email, password);
    return { success: true };
}