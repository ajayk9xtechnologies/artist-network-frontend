const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { OrganisationProfilePayload, ResponseState } from "@/lib/types";

 
export interface ProfileAPIResult {
  response: Response;
  body: ResponseState;
}

export async function createOrganisationProfileAPI(
  payload: OrganisationProfilePayload,
  token?: string
): Promise<ProfileAPIResult> {
  const response = await fetch(`${API_URL}/profile/create-organisation-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Cookie: `token=${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify({
      organisationProfileData: payload,
    }),
  });

  let body: ResponseState = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  return { response, body };
}

