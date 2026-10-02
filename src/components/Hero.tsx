"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Setup initial states to prevent flash of unstyled content
      gsap.set(".char", { y: 100, opacity: 0 });
      gsap.set(".stat-item", { y: 50, opacity: 0 });

      const tl = gsap.timeline();

      // Initial Load Animation
      tl.to(".char", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2
      })
      .to(".stat-item", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.5");

      // Scroll-Based Animation
      // Pin the section and animate the car and text
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Scroll distance
          scrub: 1,
          pin: true,
        }
      });

      // As we scroll:
      // 1. Car scales up and moves down slightly
      // 2. Text fades out and moves up
      // 3. Background changes
      
      scrollTl.to(carRef.current, {
        scale: 2.5,
        y: "30vh",
        ease: "none",
      }, 0)
      .to(headlineWrapperRef.current, {
        y: "-20vh",
        opacity: 0,
        scale: 0.9,
        ease: "none",
      }, 0)
      .to(bgRef.current, {
        opacity: 0.5,
        ease: "none",
      }, 0);

    },
    { scope: containerRef }
  );

  const title = "WELCOME ITZFIZZ";

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Glow */}
      <div ref={bgRef} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950 opacity-80" />

      {/* Content */}
      <div ref={headlineWrapperRef} className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-10">
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white flex flex-wrap justify-center overflow-hidden uppercase px-4 text-center leading-tight">
          {title.split("").map((char, index) => (
            <span 
              key={index} 
              className={`char inline-block ${char === " " ? "w-[2vw]" : ""}`}
              style={{ paddingRight: char !== " " ? "clamp(2px, 1vw, 15px)" : "0" }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Statistics */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 md:mt-24 text-center z-10 px-4">
          <div className="stat-item flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-red-500">98%</span>
            <span className="text-xs md:text-sm tracking-[0.2em] text-zinc-400 mt-2 uppercase font-medium">Efficiency</span>
          </div>
          <div className="stat-item flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-red-500">3.2s</span>
            <span className="text-xs md:text-sm tracking-[0.2em] text-zinc-400 mt-2 uppercase font-medium">0-60 mph</span>
          </div>
          <div className="stat-item flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-red-500">850</span>
            <span className="text-xs md:text-sm tracking-[0.2em] text-zinc-400 mt-2 uppercase font-medium">Horsepower</span>
          </div>
        </div>
      </div>

      {/* Car Image */}
      <div className="absolute bottom-[-5%] sm:bottom-[5%] left-0 w-full flex justify-center pointer-events-none z-20">
        <img
          ref={carRef}
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
          alt="Sports Car"
          className="w-[90%] max-w-5xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          style={{ 
            maskImage: 'linear-gradient(to top, transparent 5%, black 40%)', 
            WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 40%)' 
          }}
        />
      </div>
    </section>
  );
}
