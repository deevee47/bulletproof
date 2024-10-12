import EventCard from '../components/Events';

const speakers = [
  {
    day: 'Day 1',
    event: 'Event 1 - Workshop',
    eventtime: "Time-something",
    event1: "Event Guest - Akshay Saini",
    eventtime1:  "Time-something"
  },

  {
    day:"Day 2",
    event: "Event 1 - Workshop",
    eventtime:  "Time-something",
    event1:  "Event Guest - ???",
    eventtime1:   "Time-something"
  },
];

export default function EveCards() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center p-4 gap-4">
      <div className="container mx-auto px-4 py-6 my-4">
      <h1 className="text-center pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-8 relative z-10">
        Events
      </h1>
      </div>
      {speakers.map((speaker, index) => (
        <EventCard key={index} {...speaker} />
      ))}
    </div>
  );
}