import EventCard from '../components/Events';

const speakers = [
  {
    day: 'Day 1',
    event: 'Event 1 - Workshop',
    eventtime: "Time-something",
    event1: "Event Guest - Akshat Saini",
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
      {speakers.map((speaker, index) => (
        <EventCard key={index} {...speaker} />
      ))}
    </div>
  );
}