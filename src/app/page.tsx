import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";
import PreviousBulletProof from "@/components/PreviousBulletProof";
import OurSponsors from "@/components/OurSponsors";
import Cards from "@/components/Cards";
import EveCards from "@/components/EventCards";

export default function Home() {
  return (
    <div className="bg-black">
      <TopographicBackground />
      <Landing />
      <Cards />
      <EveCards />
      <OurSponsors />
      <PreviousBulletProof />
      <GuessSpeaker />
      
    </div>
  );
}
