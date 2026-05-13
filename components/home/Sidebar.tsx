"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Compass,
  BookOpen,
  BarChart3,
  Clapperboard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  username?: string;
}

export default function Sidebar({
  username,
}: SidebarProps) {

  const router = useRouter();

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#211f23] border-r border-white/5 hidden lg:flex flex-col py-8 z-50">

      {/* BRAND */}
      <div className="px-6 mb-10">

        <h1 className="text-[32px] font-bold tracking-tighter text-[#f0daff]">

          Storyverse
        </h1>

        <p className="text-sm text-[#cdc3d0]">

          {username
            ? `${username}'s Workspace`
            : "Creator Workspace"}
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-2">

        <Link
          href="/home"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#ddb7ff] border-r-2 border-[#ddb7ff] bg-[#ddb7ff]/5"
        >
          <Compass size={20} />

          <span>Discover</span>
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#cdc3d0] hover:bg-white/5"
        >
          <BookOpen size={20} />

          <span>Profile</span>
        </Link>

        <Link
          href="/create"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#cdc3d0] hover:bg-white/5"
        >
          <Clapperboard size={20} />

          <span>Create Story</span>
        </Link>

        <Link
          href="/analytics"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#cdc3d0] hover:bg-white/5"
        >
          <BarChart3 size={20} />

          <span>Analytics</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#cdc3d0] hover:bg-white/5"
        >
          <Settings size={20} />

          <span>Settings</span>
        </Link>
      </nav>

      {/* BOTTOM */}
      <div className="px-6 space-y-6">

        <button className="w-full bg-[#ddb7ff] text-[#40215e] py-3 rounded-xl text-sm font-bold">

          Upgrade to Pro
        </button>

        <div className="space-y-2 border-t border-white/5 pt-4">

          <button className="flex items-center gap-3 px-2 py-2 text-[#cdc3d0]">

            <HelpCircle size={18} />

            <span>Help</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-2 py-2 text-[#cdc3d0] hover:text-red-400 transition-colors"
          >

            <LogOut size={18} />

            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}