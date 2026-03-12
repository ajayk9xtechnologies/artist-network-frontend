// profile/create-artist-profile
"use server";
import { cookies } from "next/headers";
export type ProfileState = {
    success: boolean;
    message: string;
    data?: unknown;
};
 
export const createArtistProfileAction = async (
    prevState: ProfileState,
    formData: FormData
): Promise<ProfileState> => {
     const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const categories = formData.get("categories") as unknown as string[];
    const skills = formData.get("skills") as unknown as string[];
    const country = formData.get("country") as string;
    const city = formData.get("city") as string;
    const bio = formData.get("bio") as string;
    const profilePhoto = formData.get("profilePhoto") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const gender = formData.get("gender") as string;
    const languages = formData.get("languages") as unknown as string[];
    const travelPreference = formData.get("travelPreference") as unknown as number;
    const experienceYears = formData.get("experienceYears") as unknown as number;
    const expectedRateMin = formData.get("expectedRateMin") as unknown as number;
    const expectedRateMax = formData.get("expectedRateMax") as unknown as number;
    const currency = formData.get("currency") as string;
    const availableDates = formData.get("availableDates") as unknown as string[];
    const preferredWorkingHours = formData.get("preferredWorkingHours") as string;
    const socialLinks = formData.get("socialLinks") as unknown as {
        instagram: string;
        tiktok: string;
        youtube: string;
        spotify: string;
        website: string;
    };
    // Basic validation
    if (!firstName || !lastName || !categories || !skills || !country || !city || !bio || !profilePhoto || !dateOfBirth || !gender || !languages || !travelPreference || !experienceYears || !expectedRateMin || !expectedRateMax || !currency || !availableDates || !preferredWorkingHours || !socialLinks) {
        return {
            success: false,
            message: "Please provide all required fields.",
        };
    }
    console.log(firstName, lastName, categories, skills, country, city, bio, profilePhoto, dateOfBirth, gender, languages, travelPreference, experienceYears, expectedRateMin, expectedRateMax, currency, availableDates, preferredWorkingHours, socialLinks, "firstName, lastName, categories, skills, country, city, bio, profilePhoto, dateOfBirth, gender, languages, travelPreference, experienceYears, expectedRateMin, expectedRateMax, currency, availableDates, preferredWorkingHours, socialLinks");
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/create-artist-profile`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
               
                body: JSON.stringify({
                    artistProfileData: {
                        firstName,
                        lastName,
                        categories,
                        skills,
                        country,
                        city,
                        bio,
                        profilePhoto,
                        dateOfBirth,
                        gender,
                        languages,
                        travelPreference,
                        experienceYears,
                        expectedRateMin,
                        expectedRateMax,
                        currency,
                        availableDates,
                        preferredWorkingHours,
                        socialLinks,
                    },
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

        return {
            success: true,
            message: "Login successful!",
            data,
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: "Network error. Please check your connection.",
        };
    }
};

// get profile action
// profile/fetch-user
export const getProfileAction = async (): Promise<ProfileState> => {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
        return { success: false, message: "Not authenticated" };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/fetch-user`,
            {
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                },
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: data?.message ?? "Profile fetch failed. Please try again.",
            };
        }
        return {
            success: true,
            message: "Profile fetched successfully!",
            data,
        };
    } catch (error) {
        console.error("Profile fetch error:", error);
        return {
            success: false,
            message: "Network error. Please check your connection.",
        };
    }
};