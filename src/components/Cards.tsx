import SpeakerCard from '../components/Speakers';

const speakers = [
  {
    name: 'Akshay Saini',
    role: 'Founder - Namaste Dev',
    linkedin: 'https://www.linkedin.com/in/akshaymarch7/?originalSubdomain=in',
    github: 'https://github.com/akshaymarch7',
    image: '/akshay.jpeg',
  },
  {
    name: 'Mehul Mohan',
    role: 'Founder - Codedamn',
    linkedin: 'https://www.linkedin.com/in/mehulmpt/?originalSubdomain=in',
    github: 'https://github.com/mehulmpt',
    image: '/mehul.jpeg',
  },
  // Add more speakers here
];

export default function Cards() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center p-4 gap-4">
      <div className="container mx-auto px-4 py-6 my-4">
      <h1 className="text-center pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-8 relative z-10">
        Our Speakers
      </h1>
      </div>
      {speakers.map((speaker, index) => (
        <SpeakerCard key={index} {...speaker} />
      ))}
    </div>
  );
}