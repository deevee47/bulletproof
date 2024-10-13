import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";
import PreviousBulletProof from "@/components/PreviousBulletProof";
import OurSponsors from "@/components/OurSponsors";
import Card from "@/components/Card";
import Day2 from "@/components/mehulreg";

export default function Home() {
  return (
    <div className="bg-black">
      <TopographicBackground />
      <Landing />
      <Card />
      <OurSponsors />
      
      <GuessSpeaker />
      <Day2 />
      
    </div>
  );
}
