"use client"
import Image from 'next/image';
import React from 'react';
import { MagicCard } from './ui/magic-card';

function Events() {
  return (
    <div className='flex flex-col items-center justify-start min-h-screen pt-10 px-4 mb-16'>
      {/* Day 1 Event Card */}
      <MagicCard gradientOpacity={0.8} gradientColor="#FFD700" delay={200}>
        <div className='shadow-lg flex flex-col md:flex-row items-center text-white gap-10 p-3 rounded-xl cursor-none hover:cursor-none'>
          <div className='w-full md:w-64 lg:w-72 h-auto flex-shrink-0'>
            <Image className='border-2 rounded-xl object-cover' src='/akki.jpg' width={300} height={300} alt='Akshay Saini' />
          </div>
          <div className='w-full md:w-1/2 lg:w-3/4'>
            <h1 className='pb-3 pt-3 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-4xl md:text-6xl lg:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10'>
              Day 1
            </h1>

            <h2 className='font-bold text-lg sm:text-xl md:text-2xl'>Event One: Akshay Saini's Session</h2>
            <p className='mt-2 text-xs sm:text-sm md:text-base'>
              Akshay Saini is the creator of Namaste Dev, a popular YouTube channel focused on web development. He is a seasoned software engineer with experience at companies like Amazon and Directi. Akshay is known for his in-depth tutorials on JavaScript and other web technologies, making complex topics easy to understand for developers.
            </p>
          </div>
        </div>
      </MagicCard>

      {/* Day 2 Event Card */}
      <MagicCard gradientOpacity={0.8} gradientColor="#FFD700" delay={200}>
        <div className='shadow-lg flex flex-col md:flex-row items-center text-white gap-10 p-3 rounded-xl cursor-none hover:cursor-none'>
          <div className='w-full md:w-64 lg:w-72 h-auto flex-shrink-0'>
            <Image className='border-2 rounded-xl object-cover' src='/mehul.jpg' width={300} height={300} alt='Mehul Mohan' />
          </div>
          <div className='w-full md:w-1/2 lg:w-3/4'>
            <h1 className='pb-3 pt-3 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-left text-4xl md:text-6xl lg:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10'>
              Day 2
            </h1>
            <h2 className='font-bold text-lg sm:text-xl md:text-2xl'>Event One: Logic League</h2>
            <h2 className='font-bold text-lg sm:text-xl md:text-2xl'>Event Two: Mehul Mohan's Session</h2>
            <p className='mt-2 text-xs sm:text-sm md:text-base'>
              Mehul Mohan is the founder of CodeDamn, an interactive learning platform for developers. He is a full-stack developer, educator, and YouTuber who creates content focused on web development, programming, and tech careers. Through CodeDamn, he aims to provide hands-on coding experience and project-based learning for aspiring developers.
            </p>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}

export default Events;
