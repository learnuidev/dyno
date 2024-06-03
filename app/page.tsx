"use client";

import TablesList from "@/components/tables-list";

export default function Home() {
  return (
    <main className="dark:bg-black dark:text-white">
      <div className="pt-32 text-center">
        <h1 className="text-7xl">dyno</h1>
        <h1 className="text-3xl mt-8 font-extralight text-gray-400">
          dynamodb client from the future
        </h1>
      </div>

      <TablesList />
    </main>
  );
}
