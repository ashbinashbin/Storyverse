"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

import Sidebar from "@/components/home/Sidebar";
import Topbar from "@/components/home/Topbar";
import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";

import {
  getAllStories,
  getProfile,
} from "@/services/api";

interface Story {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: string[];
  comments: string[];
  user?: {
    username?: string;
  };
}

export default function HomePage() {

  const [stories, setStories] =
    useState<Story[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const { setUser } = useUser();


  // FETCH STORIES
useEffect(() => {

  const fetchData = async () => {

    try {

      const [
        storiesData,
        profileData,
      ] = await Promise.all([
        getAllStories(),
        getProfile(),
      ]);

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

      // USER CONTEXT
      if (
        profileData.success
      ) {

        setUser(
          profileData.data
        );
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  fetchData();

}, [setUser]);

  // FILTER STORIES
  const filteredStories =
    stories.filter((story) =>
      story.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="bg-[#151217] text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="lg:ml-64 min-h-screen">

        {/* TOPBAR */}
        <Topbar
          search={search}
          setSearch={setSearch}
        />

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8 space-y-10">

          {/* HERO */}
          {!loading &&
            stories.length > 0 && (

            <HeroSection
              title={stories[0].title}
              content={stories[0].content}
              image={stories[0].image}
            />
          )}

          {/* TRENDING */}
          <TrendingSection
            stories={filteredStories}
          />
        </div>
      </main>
    </div>
  );
}