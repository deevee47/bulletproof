'use client';
import React from 'react';
import Form from './Form';
import BoxReveal from './ui/box-reveal';

const GuessSpeaker = () => {
  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'expectations', label: 'What do you expect from the event?', type: 'text' },
    { name: 'guess', label: 'Guess our speaker!', type: 'text', required: true}
  ];

  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className='text-white min-h-screen flex justify-center items-center py-16 relative overflow-hidden'>
      <div className='w-full max-w-2xl px-4 relative z-10'>
        <div className="size-full items-center justify-center overflow-hidden pt-8 mb-12">
          <BoxReveal boxColor={"#fbd38d"} duration={0.5}>
            <p className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_20%)]">
              Guess Our Speakers
            </p>
          </BoxReveal>
        </div>

        <Form fields={fields} onSubmit={handleSubmit} />
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
      `}</style>
    </div>
  );
};

export default GuessSpeaker;
