"use client";
import { Marquee } from "@/components/ui/marquee";

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
    <div className="relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg">
      <div className="flex flex-row gap-4 [perspective:300px]">
        <Marquee
          className="h-96 md:h-80 lg:h-96 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}
        >
          {logos.map((data, idx) => (
            <img
              key={idx}
              src={data.img}
              alt={data.name}
              className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
            />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent"></div>
    </div>
  );
}
