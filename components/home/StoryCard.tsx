"use client";

import { useState } from "react";

import {
  Heart,
  MessageCircle,
} from "lucide-react";

import { likeStory } from "@/services/api";

type Props = {
  _id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  content: string;
  likes: string[];
  comments: string[];
};

export default function StoryCard({
  _id,
  title,
  image,
  category,
  author,
  content,
  likes,
  comments,
}: Props) {

  // LOCAL LIKE STATE
  const [likesCount, setLikesCount] =
    useState(likes?.length || 0);

  const [liked, setLiked] =
    useState(false);

  // LIKE STORY
  const handleLike = async () => {

    try {

      const data =
        await likeStory(_id);

      setLikesCount(
        data.likesCount
      );

      setLiked(data.liked);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <article className="bg-[#161616]/70 border border-white/5 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(221,183,255,0.1)] transition-all duration-300 group">

      {/* IMAGE */}
      <div className="aspect-[16/9] overflow-hidden">

        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          }
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* TOP */}
        <div className="flex items-center gap-2 mb-3">

          <span className="text-[#ddb7ff] text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#ddb7ff]/10 border border-[#ddb7ff]/20">

            {category || "Story"}
          </span>

          <span className="text-[#cdc3d0] text-xs">

            Recently Published
          </span>
        </div>

        {/* TITLE */}
        <h4 className="text-xl font-bold mb-2 group-hover:text-[#ddb7ff] transition-colors">

          {title}
        </h4>

        {/* CONTENT */}
        <p className="text-[#cdc3d0] text-sm mb-6 line-clamp-3">

          {content}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between">

          <span className="text-sm text-[#cdc3d0]">

            {author}
          </span>

          <div className="flex items-center gap-4 text-[#cdc3d0]">

            {/* LIKE */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                liked
                  ? "text-[#ddb7ff]"
                  : "hover:text-[#ddb7ff]"
              }`}
            >

              <Heart
                size={16}
                fill={
                  liked
                    ? "#ddb7ff"
                    : "transparent"
                }
              />

              {likesCount}
            </button>

            {/* COMMENT */}
            <button className="flex items-center gap-1 text-sm hover:text-[#ddb7ff] transition-colors">

              <MessageCircle size={16} />

              {comments?.length || 0}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}