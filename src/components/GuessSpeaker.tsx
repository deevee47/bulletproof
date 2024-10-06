'use client';
import React from 'react';
import Form from './Form';
import BoxReveal from './ui/box-reveal';

const GuessSpeaker = () => {
  const fields = [
    { name: 'firstName', label: 'First Name*', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name*', type: 'text', required: true },
    { name: 'email', label: 'Bennett Email Address*', type: 'email', required: true },
    { name: 'expectations', label: 'What do you expect from the event?', type: 'text' },
    { name: 'guess', label: 'Guess our speakers!*', type: 'text', required: true }
  ];

  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className='relative min-h-screen flex flex-col justify-center overflow-hidden sm:mt-4 -mt-20'>
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/2 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content container */}
      <div className='relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16'>
        <div className="w-full flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
          <BoxReveal boxColor={"#fbd38d"} duration={0.5}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_20%)]">
              Guess Our Speakers
            </h1>
          </BoxReveal>
        </div>

        <div className="w-full">
          <Form fields={fields} onSubmit={handleSubmit} />
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default GuessSpeaker;