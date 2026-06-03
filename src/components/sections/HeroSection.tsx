'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '@/types';

const BRAND_RED = '#C52023';

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'PORTA FRIGORÍFICA DESLIZANTE',
    subtitle: 'Soluções de acesso para câmaras frias',
    image:
      'https://robustponds.pt/wp-content/uploads/2018/10/portas-frigorificas-deslizantes.jpg',
  },
  {
    id: 2,
    title: 'PORTA FRIGORÍFICA PIVOTANTE',
    subtitle: 'Qualidade e durabilidade garantidas',
    image:
      'https://i0.wp.com/robustponds.pt/wp-content/uploads/2018/11/foto2b-logo.jpg?fit=1920%2C800',
  },
  {
    id: 3,
    title: 'PAINÉIS ISOTÉRMICOS',
    subtitle: 'Isolamento térmico superior para câmaras frias',
    image:
      'https://i0.wp.com/robustponds.pt/wp-content/uploads/2018/11/Camara7-logo.jpg?fit=1920%2C809',
  },
  {
    id: 4,
    title: 'GUARDA RAIL',
    subtitle: 'Proteção industrial de alto impacto',
    image:
      'https://i0.wp.com/robustponds.pt/wp-content/uploads/2018/11/foto1b-logo.jpg?fit=1920%2C800',
  },
  {
    id: 5,
    title: 'PORTA RÁPIDA',
    subtitle: 'Eficiência e rapidez no acesso diário',
    image:
      'https://robustponds.pt/wp-content/uploads/2018/11/Porta-r%C3%A1pida-500x359.jpg',
  },
  {
    id: 6,
    title: 'PORTA HOSPITALAR',
    subtitle: 'Portas especializadas para ambientes hospitalares',
    image:
      'https://i0.wp.com/robustponds.pt/wp-content/uploads/2022/08/porta-hospital-robustponds.png?fit=2000%2C1200',
  },
];

const SLIDE_INTERVAL = 5000;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = SLIDES.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [current, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % totalSlides);
  }, [current, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + totalSlides) % totalSlides);
  }, [current, totalSlides, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <Image
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            fill
            className="object-cover object-center"
            priority={current === 0}
            sizes="100vw"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-xl"
              >
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-3"
                  style={{
                    color: BRAND_RED,
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                  }}
                >
                  {SLIDES[current].title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium drop-shadow-md">
                  {SLIDES[current].subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left/Right arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="size-5 sm:size-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight className="size-5 sm:size-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? 'w-8 h-2.5 sm:w-10 sm:h-3'
                : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
            }`}
            style={{
              backgroundColor:
                index === current ? BRAND_RED : 'rgba(255,255,255,0.5)',
            }}
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
