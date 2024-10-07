import React from 'react';
import BlurIn from './ui/blur-in';
import Image from 'next/image';
import { ChevronsDown } from 'lucide-react';

const Landing = () => {
  return (
    <div className='flex relative min-h-screen overflow-hidden'>
      <div className='z-10 w-full px-4 sm:px-6 lg:px-8 flex justify-center items-center'>
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='relative w-full'>
            <div className='mx-auto relative w-full sm:w-4/5 aspect-[6/5] sm:-mt-48'>
              <Image
                className='logo object-contain draggable-none'
                src="/logo.png"
                alt="Bulletproof Logo"
                fill
                priority
              />
            </div>

            <div className='-mt-16 sm:-mt-96 transform flex flex-col items-center'>
              <BlurIn
                word="Learn. Excel. Lead."
                className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_20%)] text-center"
              />

              <div className="mt-2 sm:mt-4 md:mt-4 space-y-2 w-full px-4 flex justify-center items-center">
                <p className="w-4/5 text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-center">
                  Two game-changing days where tech collides with the future. Exclusive speakers and visionary influencers are set to revolutionize how you see the tech industry.
                </p>
              </div>
              <ul className='mt-10 text-3xl animate-bounce text-gray-400'>
                <ChevronsDown />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;