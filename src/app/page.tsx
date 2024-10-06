import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";


export default function Home() {
  return (
    <div className="bg-black">
      <Landing />
      <GuessSpeaker />
    </div>
  );
}
