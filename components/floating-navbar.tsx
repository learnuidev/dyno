"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

import { DisplayIf } from "./display-if";
import { Icons } from "./icons";

export const FloatingNavbar = () => {
  const routeName = usePathname();

  return (
    <DisplayIf variant="autenticated">
      <div className="flex w-full fixed z-50 bottom-4 transition">
        <div className="flex items-center w-full justify-center">
          <div className="px-8  py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <div className="space-x-8 flex justify-center items-center w-full">
              <Link
                href="/"
                className={`transition ${
                  routeName === "/"
                    ? "text-gray-800 dark:text-gray-300"
                    : "text-gray-200 dark:text-gray-500"
                } hover:text-white transition text-xl`}
              >
                {routeName === "/" ? (
                  <Icons.photoFilmSolid className="hover:text-white transition" />
                ) : (
                  <Icons.photoFilm className="hover:text-white transition" />
                )}
              </Link>

              <Link
                href="/history"
                className={`transition ${
                  routeName === "/history"
                    ? "text-gray-800 dark:text-gray-300"
                    : "text-gray-200 dark:text-gray-500"
                } hover:text-gray-700 transition text-xl`}
              >
                {routeName === "/history" ? (
                  <Icons.verticalStackSolid className="hover:text-white transition" />
                ) : (
                  <Icons.verticalStack className="hover:text-white transition" />
                )}
              </Link>
              <Link
                href="https://docs.dyno.im/deploy"
                target="_blank"
                className={`transition ${
                  routeName === "/deploy"
                    ? "text-gray-800 dark:text-gray-300"
                    : "text-gray-200 dark:text-gray-500"
                } hover:text-gray-700 transition text-xl`}
              >
                <Icons.docs className="hover:text-white transition" />
              </Link>
            </div>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
        </div>
      </div>
    </DisplayIf>
  );
};
