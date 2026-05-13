"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/home/Sidebar";
import Topbar from "@/components/home/Topbar";
import StoryCard from "@/components/home/StoryCard";

import {
  getProfile,
  getMyStories,
  updateProfileImage,
  updateUsername,
} from "@/services/api";

interface Story {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: string[];
  comments: string[];
}

export default function ProfilePage() {

  // PROFILE STATES
  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [profileImage, setProfileImage] =
    useState("");

  // EDIT STATES
  const [newUsername, setNewUsername] =
    useState("");

  const [newProfileImage, setNewProfileImage] =
    useState("");

  // STORIES
  const [stories, setStories] =
    useState<Story[]>([]);

  // UI STATES
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // FETCH PROFILE + STORIES
  useEffect(() => {

    const fetchData = async () => {

      try {

        const profileData =
          await getProfile();

        const storiesData =
          await getMyStories();

        // PROFILE
        const user =
          profileData.data;

        setUsername(
          user.username
        );

        setEmail(
          user.email
        );

        setProfileImage(
          user.profileImage
        );

        setNewUsername(
          user.username
        );

        setNewProfileImage(
          user.profileImage
        );

        // STORIES
        if (storiesData.data) {

          setStories(
            storiesData.data
          );

        } else {

          setStories(
            storiesData
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, []);

  // UPDATE PROFILE
  const handleUpdateProfile =
    async () => {

      try {

        setSaving(true);

        setMessage("");

        // UPDATE USERNAME
        if (
          newUsername !== username
        ) {

          await updateUsername(
            newUsername
          );

          setUsername(
            newUsername
          );
        }

        // UPDATE IMAGE
        if (
          newProfileImage !==
          profileImage
        ) {

          await updateProfileImage(
            newProfileImage
          );

          setProfileImage(
            newProfileImage
          );
        }

        setMessage(
          "Profile updated successfully"
        );

      } catch (error) {

        console.log(error);

        setMessage(
          "Failed to update profile"
        );

      } finally {

        setSaving(false);
      }
    };

  return (
    <div className="bg-[#151217] text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar
        username={username}
      />

      {/* MAIN */}
      <main className="lg:ml-64 min-h-screen">

        {/* TOPBAR */}
        <Topbar
          profileImage={
            profileImage
          }
        />

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8 space-y-10">

          {/* LOADING */}
          {loading ? (

            <div className="text-center py-20 text-[#cdc3d0]">

              Loading profile...
            </div>

          ) : (

            <>
              {/* PROFILE CARD */}
              <section className="bg-[#1d1b1f] border border-white/5 rounded-3xl p-8">

                <div className="flex flex-col md:flex-row md:items-center gap-8">

                  {/* IMAGE */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ddb7ff]/20">

                    <img
                      src={
                        profileImage ||
                        "https://i.pravatar.cc/300"
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 space-y-4">

                    {/* USERNAME */}
                    <div>

                      <label className="block text-sm text-[#cdc3d0] mb-2">

                        Username
                      </label>

                      <input
                        type="text"
                        value={
                          newUsername
                        }
                        onChange={(e) =>
                          setNewUsername(
                            e.target.value
                          )
                        }
                        className="w-full bg-[#151217] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ddb7ff]"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>

                      <label className="block text-sm text-[#cdc3d0] mb-2">

                        Email
                      </label>

                      <input
                        type="text"
                        value={email}
                        disabled
                        className="w-full bg-[#151217] border border-white/5 rounded-xl px-4 py-3 opacity-60"
                      />
                    </div>

                    {/* PROFILE IMAGE */}
                    <div>

                      <label className="block text-sm text-[#cdc3d0] mb-2">

                        Profile Image URL
                      </label>

                      <input
                        type="text"
                        value={
                          newProfileImage
                        }
                        onChange={(e) =>
                          setNewProfileImage(
                            e.target.value
                          )
                        }
                        className="w-full bg-[#151217] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#ddb7ff]"
                      />
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={
                        handleUpdateProfile
                      }
                      disabled={saving}
                      className="bg-[#ddb7ff] text-[#40215e] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >

                      {saving
                        ? "Saving..."
                        : "Update Profile"}
                    </button>

                    {/* MESSAGE */}
                    {message && (

                      <p className="text-sm text-[#ddb7ff]">

                        {message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* STORIES */}
              <section>

                <div className="flex items-center justify-between mb-8">

                  <h2 className="text-3xl font-bold">

                    My Stories
                  </h2>

                  <span className="text-[#cdc3d0] text-sm">

                    {stories.length} stories
                  </span>
                </div>

                {/* STORIES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {stories.length > 0 ? (

                    stories.map(
                      (story) => (

                        <StoryCard
                          key={
                            story._id
                          }
                          _id={
                            story._id
                          }
                          title={
                            story.title
                          }
                          image={
                            story.image
                          }
                          category="Story"
                          author={
                            username
                          }
                          content={
                            story.content
                          }
                          likes={
                            story.likes
                          }
                          comments={
                            story.comments
                          }
                        />
                      )
                    )

                  ) : (

                    <div className="text-[#cdc3d0] text-sm">

                      No stories posted yet
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}