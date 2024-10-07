"use client";
import React from "react";
import { Marquee1 } from "@/components/Marquee1";
import { Marquee2 } from "@/components/Marquee2";

function PreviousBulletProof() {
  return (
    <div className="flex items-center justify-between w-full px-4 md:px-8 lg:px-16"> {/* Added padding for left and right */}
      <div className="flex flex-col items-start z-[999] w-1/2">
        <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Glimpses of Past
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-left z-[1000] relative mt-4">
          Bulletproof was a two-day event held at Bennett University, featuring influencer Yash Garg. Attendees had the chance to participate in sessions and workshops, where Yash shared insights from his experiences in the influencer space. The event focused on practical advice and personal growth.
        </p>
      </div>

      <div className="flex items-center justify-center gap-[8px] z-[1000] relative w-1/2 mt-6"> {/* Reduced gap between marquees */}
        <Marquee1 />
        <Marquee2 />
      </div>
    </div>
  );
}

export default PreviousBulletProof;
