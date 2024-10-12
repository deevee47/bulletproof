import SpeakerCard from '../components/Speakers';

const speakers = [
  {
    name: 'Akshat Saini',
    role: 'Influencer',
    linkedin: 'https://www.linkedin.com/in/akshaymarch7/?originalSubdomain=in',
    github: 'https://github.com/akshaymarch7',
    image: '/akshay.jpeg',
  },
  {
    name: '???',
    role: '????',
    linkedin: 'Hint NHi Hai',
    github: 'Hints Dekho',
    image: '/placeholder.jpg',
  },
  // Add more speakers here
];

export default function Cards() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center p-4 gap-4">
      {speakers.map((speaker, index) => (
        <SpeakerCard key={index} {...speaker} />
      ))}
    </div>
  );
}