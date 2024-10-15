'use client';
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Form from './Form';
import BoxReveal from './ui/box-reveal';
import Image from 'next/image';

const GuessSpeaker = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const fields = [
    { name: 'entry.1674238709', label: 'Name', type: 'text', placeholder: "Enter Your Full Name", required: true },
    { name: 'entry.758367768', label: 'Enrollment Number', type: 'text', placeholder: "Enter Bennett Enrollment Number", required: true },
    { name: 'entry.961624252', label: 'Contact Number', type: 'text', placeholder: "Enter Mobile Number", required: true },
    { name: 'entry.1373895948', label: 'You\'re registering for which day?', type: 'text', placeholder: "(Day 1/Day 2/ Both)", required: true },
    { name: 'entry.896257951', label: 'Anything you would like us to know?', placeholder: "Spill all the beans!", type: 'text', required: true },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    const recipientName = formData['entry.1674238709'];
    const recipientEmail = formData['entry.758367768'] + '@bennett.edu.in';

    const templateParams = {
      to_name: recipientName,
      to_email: recipientEmail,
      subject: 'Welcome to Bulletproof 2.0 – Reservation Confirmed!',
      message: `
      <h2>Dear {{to_name}},</h2>

      <p>We hope this message finds you well!</p>

      <p>We are delighted to inform you that your seat has been successfully reserved for <strong>Bulletproof 2.0</strong>! Thank you for registering – we can't wait to have you with us for this exciting event.</p>

      <h3>Event Details:</h3>
      <ul>
        <li>📅 <strong>Date:</strong> 15th-16th October</li>
        <li>🕒 <strong>Time:</strong> 5:30 PM</li>
        <li>📍 <strong>Venue:</strong> 101-NLH</li>
      </ul>

      <p>You've registered for: ${formData['entry.1373895948']}</p>

      <p>Please ensure you arrive on time to avoid any delays. If you have any questions or need further assistance, feel free to reach out.</p>

      <p>We look forward to seeing you at Bulletproof 2.0! 🚀</p>

      <p>Best regards,<br>Alan Turing Club<br>Bennett University</p>
    `
    };

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams
      );
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const message = "Be fast! Few Left!";

  return (
    <div id="guess" className='relative min-h-screen flex flex-col justify-center overflow-hidden sm:mt-4 mt-0'>
      <div className='relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        <div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-12">
          <BoxReveal boxColor={"#fbd38d"} duration={0.5}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600">
              Reserve Your Seat!
            </h1>
          </BoxReveal>
          <h3 className='text-gray-400 pt-2 italic flex items-center justify-center animate-pulse'>{message} <Image className='animate-pulse rounded-full opacity-50' src="/blacklogo.jpg" width={40} height={40} alt="Guess!" /></h3>
        </div>
        <div className="w-full">
          <Form fields={fields} onSubmit={handleSubmit} />
        </div>
        {isSubmitting && <p className="text-center mt-4">Submitting...</p>}
        {submitStatus === 'success' && <p className="text-center mt-4 text-green-500">Form submitted successfully! Check your email for confirmation.</p>}
        {submitStatus === 'error' && <p className="text-center mt-4 text-red-500">An error occurred. Please try again.</p>}
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