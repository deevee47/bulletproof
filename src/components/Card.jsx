"use client";
import Image from "next/image";
import React from "react";
import { MagicCard } from "./ui/magic-card";

function Events() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 mb-16">
      {/* Day 1 Event Card */}
      <MagicCard gradientOpacity={0.8} gradientColor="#FFD700" delay={200}>
        <div className="shadow-lg flex flex-col md:flex-row items-center text-white gap-10 p-3 rounded-xl">
          <div className="w-full md:w-64 lg:w-72 h-auto flex-shrink-0">
            <Image
              className="border-2 rounded-xl object-cover filter grayscale"
              src="/akki.jpg"
              width={300}
              height={300}
              alt="Akshay Saini"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/4">
            <h1 className="pb-3 pt-3 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              15<span className="align-super text-3xl">th</span> October
            </h1>
            <h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-yellow-400">
              Akshay Saini&apos;s Session
            </h2>
            <h3 className="font-bold text-md sm:text-lg text-white">
              Time: 5:00 PM | Venue: 101 NLH
            </h3>
            <p className="mt-5 text-sm sm:text-base text-gray-100">
              Akshay Saini, creator of Namaste Dev, simplifies web development
              with his expertise. With experience at Amazon and Directi,
              he&apso;s best known for breaking down complex JavaScript
              concepts.
            </p>
          </div>
        </div>
      </MagicCard>

      {/* Day 2 Event Card */}
      <MagicCard gradientOpacity={0.8} gradientColor="#FFD700" delay={200}>
        <div className="shadow-lg flex flex-col md:flex-row items-center text-white gap-10 p-3 rounded-xl">
          <div className="w-full md:w-64 lg:w-72 h-auto flex-shrink-0">
            <Image
              className="border-2 rounded-xl object-cover filter grayscale"
              src="/mehul.jpg"
              width={300}
              height={300}
              alt="Mehul Mohan"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/4">
            <h1 className="pb-3 pt-3 bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              16<span className="align-super text-3xl">th</span> October
            </h1>
            <h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-yellow-400">
              Logic League & Mehul Mohan&apos;s Session
            </h2>
            <h3 className="font-bold text-md sm:text-lg text-white">
              Time: 5:00 PM | Venue: 101 NLH
            </h3>
            <p className="mt-5 text-sm sm:text-base text-gray-100">
              Mehul Mohan, founder of CodeDamn, focuses on hands-on learning.
              His session will explore web development trends and practical tips
              for developers.
            </p>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}

export default Events;
