import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";
import PreviousBulletProof from "@/components/PreviousBulletProof";



export default function Home() {
  return (
    <div className="bg-black">
      <TopographicBackground />
      <Landing />
      <PreviousBulletProof />
      <GuessSpeaker />
    </div>
  );
}
