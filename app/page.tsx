import Hero from "@/components/Hero";
import MosaicGame from "@/components/MosaicGame";
import LoveNote from "@/components/LoveNote";
import Gallery from "@/components/Gallery";
import PhotoGrid from "@/components/PhotoGrid";
import TruthOrDare from "@/components/TruthOrDare";
import LoveWheel from "@/components/LoveWheel";
import Promises from "@/components/Promises";
import Proposal from "@/components/Proposal";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden">
      <Hero />
      <TruthOrDare />
      <LoveWheel />
      <MosaicGame />
      <Promises />
      <LoveNote />
      <Gallery />
      <PhotoGrid />
      <Proposal />

      <footer className="py-20 bg-rose-950 text-center text-rose-300 text-sm">
        Made with ❤️ for you
      </footer>
    </main>
  );
}
