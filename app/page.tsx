
import Hero from "@/components/Hero";
import MosaicGame from "@/components/MosaicGame";
import LoveNote from "@/components/LoveNote";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50/50">
      <Hero />
      <MosaicGame />
      <LoveNote />
      <Gallery />

      <footer className="py-8 text-center text-rose-300 text-sm">
        Made with ❤️ for you
      </footer>
    </main>
  );
}
