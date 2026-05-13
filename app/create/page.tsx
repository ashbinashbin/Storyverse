"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/home/Sidebar";
import Topbar from "@/components/home/Topbar";

import { createStory } from "@/services/api";

export default function CreatePage() {

  const router = useRouter();

  // FORM STATES
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState("");

  // UI STATES
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // CREATE STORY
  const handleCreateStory =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        const data =
          await createStory(
            title,
            content,
            image
          );

        // BACKEND ERROR
        if (
          data.success === false
        ) {

          setError(
            data.message ||
            "Failed to create story"
          );

          setLoading(false);

          return;
        }

        // REDIRECT
        router.push("/home");

      } catch (error) {

        console.log(error);

        setError(
          "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="bg-[#151217] text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="lg:ml-64 min-h-screen">

        {/* TOPBAR */}
        <Topbar />

        <div className="max-w-5xl mx-auto px-5 md:px-10 py-10">

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-4xl font-bold tracking-tight mb-3">

              Create Story
            </h1>

            <p className="text-[#cdc3d0]">

              Bring your imagination into Storyverse.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              handleCreateStory
            }
            className="space-y-8"
          >

            {/* TITLE */}
            <div>

              <label className="block text-sm text-[#cdc3d0] mb-3">

                Story Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Enter story title..."
                required
                className="w-full bg-[#1d1b1f] border border-white/5 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#ddb7ff]"
              />
            </div>

            {/* IMAGE URL */}
            <div>

              <label className="block text-sm text-[#cdc3d0] mb-3">

                Cover Image URL
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) =>
                  setImage(
                    e.target.value
                  )
                }
                placeholder="Paste image URL..."
                className="w-full bg-[#1d1b1f] border border-white/5 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#ddb7ff]"
              />
            </div>

            {/* CONTENT */}
            <div>

              <label className="block text-sm text-[#cdc3d0] mb-3">

                Story Content
              </label>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                placeholder="Write your story..."
                required
                rows={14}
                className="w-full bg-[#1d1b1f] border border-white/5 rounded-2xl px-5 py-4 text-white outline-none resize-none focus:border-[#ddb7ff]"
              />
            </div>

            {/* ERROR */}
            {error && (

              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">

                {error}
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex items-center gap-4">

              <button
                type="submit"
                disabled={loading}
                className="bg-[#ddb7ff] text-[#40215e] px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >

                {loading
                  ? "Publishing..."
                  : "Publish Story"}
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/home"
                  )
                }
                className="border border-white/10 px-8 py-3 rounded-xl text-[#cdc3d0] hover:bg-white/5 transition-colors"
              >

                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}