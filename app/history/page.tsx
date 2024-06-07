// import Image from 'next/image'
"use client";

import { useState } from "react";

import { History } from "@/components/features/history/history";

export default function Home() {
  return (
    <main className="dark:text-white">
      <History />
    </main>
  );
}
