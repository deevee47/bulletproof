import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";
// import { Marquee3D } from "@/components/Marquee3D";
import PreviousBulletProof from "@/components/PreviousBulletProof";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <TopographicBackground />
      <Landing />
      <PreviousBulletProof />
      <GuessSpeaker />
      <Footer />
    </div>
  );
}
