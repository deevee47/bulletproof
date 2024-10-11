import React from 'react';
import Image from 'next/image';

const OurSponsors = () => {
  const sponsorImages = ['/1.png', '/s2.jpg', '/3.png', '/4.png', '/s5.png', '/6.png', '/7.png'];

  return (
    <div className="container mx-auto px-4 py-6 my-4">
      <h1 className="text-center pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-8 relative z-10">
        Our Sponsors
      </h1>
      <div className='flex justify-center items-center'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {sponsorImages.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <Image
                  src={image}
                  alt={`Sponsor ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurSponsors;