"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loading() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation de l'overlay
    gsap.timeline({ repeat: -1, yoyo: true })
      .to(overlayRef.current, {
        x: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      .fromTo(textRef.current, 
        { scale: 0.9 },
        { scale: 1.1, duration: 0.75, ease: 'elastic.out(1, 0.5)' },
        '<'
      );
  }, []);

  return (
    <div className='relative flex justify-center items-center h-[100vh] overflow-hidden'>
      <div 
        ref={overlayRef}
        className='absolute top-0 left-0 w-full h-full bg-white mix-blend-overlay 
                   transform -translate-x-full'
      />
      
      <div 
        ref={textRef}
        className='text-5xl bg-gradient-to-r from-red-500 via-amber-400 to-blue-700 
                   text-transparent bg-clip-text z-10'
      >
        Loading...
      </div>
    </div>
  );
}