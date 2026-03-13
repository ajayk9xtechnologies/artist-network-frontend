"use client";
import { getProfileAction } from "@/services";
import { useEffect, useState } from "react";

export default function HubPage() {
  const [profile, setProfile] = useState<unknown>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfileAction();
      console.log(res, "res");
      setProfile(res.data);
    };
    fetchProfile();
  }, []); // run once on mount
  return (
    <h1>
      Shared workspace for artists and organisations (content coming soon)
     23
    </h1>
  );
}

