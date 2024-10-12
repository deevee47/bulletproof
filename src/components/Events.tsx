'use client';
import React from "react";

const EventCard = ({ day,  event, eventtime, event1,eventtime1 }) => {


  return (
    <div className="bg-[rgba(255,255,255,0.15)] backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[rgba(100,0,255,1)] mb-1 tracking-tight">{day}</h2>
        <h2 className="text-lg text-white italic mb-4">{event}</h2>
        <p className="text-sm text-white italic mb-5">{eventtime}</p>
        <h3 className="text-lg text-white italic mb-4">{event1}</h3>
        <p className="text-sm text-white italic mb-5">{eventtime1}</p>
      </div>
    </div>
  );
};

export default EventCard;
