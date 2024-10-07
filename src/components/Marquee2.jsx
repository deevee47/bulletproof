"use client";
import { Marquee } from "@/components/ui/marquee";

const logos = [
  {
    name: "Microsoft",
    img: "https://picsum.photos/id/7/200/300",
  },
  {
    name: "Apple",
    img: "https://picsum.photos/id/8/200/300",
  },
  {
    name: "Google",
    img: "https://picsum.photos/id/9/200/300",
  },
  {
    name: "Facebook",
    img: "https://picsum.photos/id/10/200/300",
  },
  {
    name: "LinkedIn",
    img: "https://picsum.photos/id/11/200/300",
  },
  {
    name: "Twitter",
    img: "https://picsum.photos/id/12/200/300",
  },
];

export function Marquee2() {
  return (
    <div className="relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg">
      <div className="flex flex-row gap-4 [perspective:300px]">
        <Marquee
          className="h-96 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
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
