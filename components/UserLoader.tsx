"use client";

import {
  useEffect,
} from "react";

import {
  getProfile,
} from "@/services/api";

import {
  useUser,
} from "@/app/context/UserContext";

export default function UserLoader() {

  const {
    setUser,
  } = useUser();

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const data =
            await getProfile();

          setUser(
            data.data
          );

        } catch {}

      };

    loadUser();

  }, []);

  return null;
}