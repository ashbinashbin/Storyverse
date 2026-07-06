"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "@/services/api";

interface User {
  _id?: string;
  username?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  followers?: string[];
  following?: string[];
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<
    React.SetStateAction<User>
  >;
}

const UserContext =
  createContext<UserContextType | null>(
    null
  );

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] =
    useState<User>({});

  useEffect(() => {

    const loadUser =
      async () => {

        try {

          const data =
            await getProfile();

          if (
            data.success
          ) {

            setUser(
              data.data
            );
          }

        } catch (error) {

          console.log(
            "Failed to load user",
            error
          );
        }
      };

    loadUser();

  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {

  const context =
    useContext(UserContext);

  if (!context) {

    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
};