import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";


export default function Home() {
  return (
    <div className="bg-black">
      <TopographicBackground />
      <Landing />
      <GuessSpeaker />
    </div>
  );
}
