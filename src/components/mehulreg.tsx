'use client';
import React from 'react';
import Form from './Form';
import BoxReveal from './ui/box-reveal';
import Image from 'next/image';

const Day2 = () => {
  const fields = [
    { name: 'entry.2029444953', label: 'First Name', type: 'text', placeholder: "Enter Your First Name", required: true },
    { name: 'entry.414857056', label: 'Last Name', type: 'text', placeholder: "Enter Your Last Name", required: true },
    { name: 'entry.909872393', label: 'Bennett Email Address', type: 'email', placeholder: "Enter Bennett Email Address", required: true },
    { name: 'entry.726139344', label: 'Contact Information', placeholder: "Enter your Contact Number", type: 'text', required: true },
    //{ name: 'entry.660628216', label: 'Guess our speakers!', type: 'text', placeholder: "Tickle your brain and Guess!", required: true },
  ];

  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log('Form submitted:', formData);
  };
  const message = "We've Got Prizes!!!";

  return (
    <div id="guess" className='relative min-h-screen flex flex-col justify-center overflow-hidden sm:mt-4 mt-0'>
      <div className='relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        <div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-12">
          <BoxReveal boxColor={"#fbd38d"} duration={0.5}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600">
              Day 2: 16th of October
            </h1>
          </BoxReveal>

          <h3 className='text-gray-400 pt-2 italic flex items-center justify-center animate-pulse'>{message} <Image className='animate-pulse rounded-full opacity-50' src="/blacklogo.jpg" width={40} height={40} alt="Guess!" /></h3>
          
            
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

export default Day2;