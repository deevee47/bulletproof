import Landing from "@/components/Landing";
import TopographicBackground from "@/components/TopographicBackground";
import BentoDemo from "@/components/Bento";
export default function Home() {
  return (
    <div className="bg-black">
      <TopographicBackground />
      <Landing />
      <BentoDemo />
      
    </div>
  );
}
