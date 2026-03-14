"use client";

import { getProfileAction } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ProfileData = {
  role?: string;
  email?: string;
  [key: string]: unknown;
};

export default function HubRolePage() {
  const params = useParams();
  const role = params.role as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfileAction();
      if (res.success && res.data) setProfile(res.data as ProfileData);
    }
    fetchProfile();
  }, []);

  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "User";

  return (
    <div className="space-y-4">
      <h1>{displayRole} workspace</h1>
      <p className="text-muted-foreground">
        Shared layout and profile API. Content coming soon.
      </p>
    </div>
  );
}
