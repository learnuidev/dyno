// import Image from 'next/image'
"use client";

import { useState } from "react";

import { Register } from "@/components/register";

interface CoursePreview {
  title: string;
  description: string;
  links: { href: string; title: string }[];
}

const courses: CoursePreview[] = [
  {
    title: "Mandarin Blueprint",
    description:
      "An Ingenious Step-By-Step Online Course That Makes Learning Simple & Fun",
    links: [
      {
        title: "Get The Blueprint",
        href: "https://www.mandarinblueprint.com/buy-the-blueprint/",
      },
    ],
  },
];

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <Register />
    </main>
  );
}
