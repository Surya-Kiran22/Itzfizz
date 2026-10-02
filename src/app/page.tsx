import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen">
      <Hero />
      
      {/* Spacer sections to demonstrate scrolling effect */}
      <section className="h-[100vh] flex flex-col items-center justify-center bg-zinc-900 border-t border-zinc-800 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">Experience the Drive</h2>
        <p className="text-zinc-400 max-w-2xl text-center text-lg leading-relaxed">
          The scroll-driven animation smoothly transitions the hero section into the next piece of content, maintaining a high-performance 60fps experience using transform properties.
        </p>
      </section>
      
      <section className="h-[100vh] flex items-center justify-center bg-black px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center">Unleash the Power</h2>
      </section>
    </main>
  );
}
