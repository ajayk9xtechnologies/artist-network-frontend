export type ResponseState = {
    success?: boolean;
    message?: string;
    errors?: string[];
    data?: unknown;
    status?: number;
}


export enum ACCOUNT_STATUS {
    PENDING = 0,   // just registered; can login; first login → ACTIVE
    ACTIVE = 1,    // normal; can use the platform
    SUSPENDED = 2, // blocked (login rejected); can login but not use the platform
    DEACTIVATED = 3, // closed (login rejected); cannot login
}
export type OrganisationProfilePayload = {
    name: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
    country: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    categories: string[];
    website: string | null;
    address: string | null;
    socialLinks: {
        instagram: string | null;
        facebook: string | null;
        linkedin: string | null;
        twitter: string | null;
    };
    employeeCount: number | null;
    foundedYear: number | null;
    subscriptionTier: "free" | "pro" | "enterprise";
};