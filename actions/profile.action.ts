"use server";

import { cookies } from "next/headers";
import { createOrganisationProfileAPI } from "@/services/profile.service";
import type { ResponseState } from "@/lib/types";

export async function orgOnboardingAction(
  _prevState: ResponseState,
  formData: FormData
): Promise<ResponseState> {

  const categories = formData.getAll("categories") as string[];

  if (!categories || categories.length === 0) {
    return {
      success: false,
      message: "Please select at least one category.",
      status: 400,
    };
  }

  const employeeCountRaw = formData.get("employeeCount") as string | null;
  const foundedYearRaw = formData.get("foundedYear") as string | null;
  const employeeCount = employeeCountRaw ? Number(employeeCountRaw) : null;
  const foundedYear = foundedYearRaw
    ? foundedYearRaw.includes("-")
      ? Number(foundedYearRaw.split("-")[0])
      : Number(foundedYearRaw)
    : null;

  const normalizeNullable = (v: string | null) => {
    if (!v) return null;
    const trimmed = v.trim();
    return trimmed.length === 0 ? null : trimmed;
  };

  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    city: formData.get("city"),
    categories,
    website: normalizeNullable(formData.get("website") as string | null),
    address: normalizeNullable(formData.get("address") as string | null),
    socialLinks: {
      instagram: normalizeNullable(formData.get("instagram") as string | null),
      facebook: normalizeNullable(formData.get("facebook") as string | null),
      linkedin: normalizeNullable(formData.get("linkedin") as string | null),
      twitter: normalizeNullable(formData.get("twitter") as string | null),
    },
    employeeCount,
    foundedYear,
    subscriptionTier: "free" as const,
  };

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const { response, body } = await createOrganisationProfileAPI(payload, token);

    if (!response.ok) {
      const detailedError =
        body?.errors && body.errors.length > 0
          ? `${body?.message ?? "Validation error"}: ${body.errors.join(", ")}`
          : body?.message ?? "Failed to create organisation profile.";
      return {
        success: body.success,
        message: detailedError,
        status: response.status,
        data: body,
        errors: body?.errors,
      };
    }

    return {
      success: true,
      message: body?.message ?? "Organisation profile created successfully.",
      status: response.status,
      data: body?.data,
      errors: body?.errors,
    };
  } catch (err) {
    console.error("[orgOnboardingAction] service error:", err);
    return {
      success: false,
      message: "Network error while creating organisation profile.",
      status: 500,
    };
  }
}

