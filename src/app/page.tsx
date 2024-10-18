import GuessSpeaker from "@/components/GuessSpeaker";
import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";
import OurSponsors from "@/components/OurSponsors";
import Card from "@/components/Card";
import GalleryPage from "@/components/GalleryPage";

export default function Home() {
  return (
    <div className="bg-black">
      {/* <TopographicBackground /> */}
      <Landing />
      <Card />
      <OurSponsors />
      <GalleryPage />
      <GuessSpeaker />
      
    </div>
  );
}
