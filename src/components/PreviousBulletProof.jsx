import React from "react";
import { Marquee1 } from "@/components/Marquee1";
import { Marquee2 } from "@/components/Marquee2";

function PreviousBulletProof() {
  return (
    <div
      id="about"
      className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8 lg:px-16 mb-5"
    >
      <div className="flex flex-col items-start z-[999] w-full md:w-1/2">
        <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-4xl md:text-6xl lg:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Glimpses of Past
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-left z-[1000] relative mt-4">
          Bulletproof was a two-day event held at Bennett University, featuring
          influencer Yash Garg. Attendees had the chance to participate in
          sessions and workshops, where Yash shared insights from his
          experiences in the influencer space. The event focused on practical
          advice and personal growth. Here is a out of context quote for
          someone: JavaScript&apos;s best-kept secret, with one and half a million
          squad.
        </p>
        {/*<p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-left z-[1000] relative mt-4">
          Anyways here is a out of context quote: With over one and half a
          million at his back, he breaks down code without a crack. JS is his
          language, his forte, guiding devs to learn the right way. Guess who's
          coming?
        </p>*/}
      </div>
      <div className="flex items-center justify-center gap-4 z-[1000] relative w-full md:w-1/2 mt-6 h-full">
        <Marquee1 />
        <Marquee2 />
      </div>
    </div>
  );
}

export default PreviousBulletProof;