'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { LinkedinIcon, GithubIcon } from 'lucide-react';

const SpeakerCard = ({ name, role, email, phone, location, linkedin, github, image }) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-lg p-6 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
          <Image
            className="object-cover"
            src={imgSrc}
            alt={`${name}'s Profile Picture`}
            width={96}
            height={96}
            //onError={() => setImgSrc('https://via.placeholder.com/96')} // Fallback image
          />
        </div>
        <h2 className="text-2xl font-bold text-[rgba(0,0,255,1)] mb-1 tracking-tight">{name}</h2>
        <p className="text-lg text-white italic mb-4">{role}</p>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedinIcon className="w-6 h-6 text-blue-600 hover:text-blue-700" />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <GithubIcon className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </a>
      </div>
    </div>
  );
};

export default SpeakerCard;
