const API_URL = "http://localhost:5000/api";

// =========================
// TOKEN
// =========================

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};

// =========================
// AUTH HEADERS
// =========================

export const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// =========================
// REGISTER USER
// =========================

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
  );

  return response.json();
};

// =========================
// LOGIN USER
// =========================

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
};

// =========================
// LIKE STORY
// =========================

export const likeStory = async (
  id: string
) => {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/stories/${id}/like`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

// =========================
// GET ALL STORIES
// =========================

export const getAllStories =
  async () => {

    const response =
      await fetch(
        "http://localhost:5000/api/stories"
      );

    return response.json();
  };

  // =========================
// CREATE STORY
// =========================

export const createStory =
  async (
    title: string,
    content: string,
    image: string
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:5000/api/stories",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            content,
            image,
          }),
        }
      );

    return response.json();
  };

  // =========================
// GET PROFILE
// =========================

export const getProfile =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:5000/api/users/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.json();
  };

// =========================
// GET MY STORIES
// =========================

export const getMyStories =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:5000/api/stories/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.json();
  };

// =========================
// UPDATE PROFILE IMAGE
// =========================

export const updateProfileImage =
  async (
    profileImage: string
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:5000/api/users/profile-image",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            profileImage,
          }),
        }
      );

    return response.json();
  };

// =========================
// UPDATE USERNAME
// =========================

export const updateUsername =
  async (
    username: string
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:5000/api/users/update-username",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            username,
          }),
        }
      );

    return response.json();
  };