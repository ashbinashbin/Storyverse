"use client";

import Link from "next/link";

import {
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

interface TopbarProps {
  profileImage?: string;
  search?: string;
  setSearch?: (
    value: string
  ) => void;
}

export default function Topbar({
  profileImage,
  search,
  setSearch,
}: TopbarProps) {
  return (
    <div className="hidden lg:flex items-center justify-between px-10 h-20 sticky top-0 bg-[#151217]/80 backdrop-blur-md z-40">

      {/* SEARCH */}
      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cdc3d0]"
        />

        <input
          type="text"
          placeholder="Search stories..."
          value={search || ""}
          onChange={(e) =>
            setSearch?.(
              e.target.value
            )
          }
          className="w-full bg-[#1d1b1f] border border-white/5 rounded-full py-2.5 pl-12 pr-4 text-sm outline-none"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        <button className="flex items-center gap-2 text-[#cdc3d0] hover:text-[#ddb7ff]">

          <Sparkles size={18} />

          <span className="text-sm font-medium">
            Inspiration
          </span>
        </button>

        <Bell
          size={20}
          className="text-[#cdc3d0]"
        />

        {/* CREATE BUTTON */}
        <Link
          href="/create"
          className="bg-[#f0daff] text-[#40215e] px-6 py-2 rounded-full text-sm font-bold"
        >
          Create
        </Link>

        {/* PROFILE */}
        <Link
          href="/profile"
          className="w-10 h-10 rounded-full overflow-hidden"
        >

          <img
            src={
              profileImage ||
              "https://i.pravatar.cc/100"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}