"use client";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const logos = [
  {
    img: "/1.jpg",
  },
  {
    img: "/2.jpg",
  },
  {
    img: "/3.jpg",
  },
  {
    img: "/4.jpg",
  },
  {
    img: "/5.jpg",
  },
];

export function Marquee1() {
  return (
    <div className="relative flex h-full w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex-col items-center justify-center gap-4 overflow-hidden rounded-lg">
      <div className="flex flex-row gap-4 [perspective:300px]">
        <Marquee
          className="h-screen justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}
        >
          {logos.map((data, idx) => (
            <Image
              key={idx}
              src={data.img}
              alt={`Logo ${idx + 1}`}
              height={600}
              width={1000}
              className="mx-auto h-auto max-w-full cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
            />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent"></div>
    </div>
  );
}