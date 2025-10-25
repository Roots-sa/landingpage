"use client";

import {
  Rocket,
  Heart,
  Users,
  Target,
  Zap,
  Shield,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function About() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      icon: Rocket,
      text: "Transformamos ideas en software que impulsa tu crecimiento",
    },
    {
      icon: Heart,
      text: "Nos mueve la tecnología, pero más aún, las personas detrás de cada proyecto",
    },
    {
      icon: Users,
      text: "Trabajamos en equipo para convertir tus visiones en realidad digital",
    },
    {
      icon: Target,
      text: "Enfocados en resultados que generen impacto real en tu negocio",
    },
    {
      icon: Zap,
      text: "Aceleramos el desarrollo sin comprometer la calidad del producto",
    },
    {
      icon: Shield,
      text: "Garantizamos soluciones robustas y escalables para el futuro",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        // Show button when Features section is visible (top of section is above viewport)
        setShowFloatingButton(rect.top < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (!carouselRef.current || isDragging) return;

    const autoScroll = setInterval(() => {
      if (carouselRef.current) {
        const cardWidth = 320; // Approximate width of each card including gap
        const maxScroll =
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        const currentScroll = carouselRef.current.scrollLeft;

        // If we're at the end, reset to beginning
        if (currentScroll >= maxScroll - 50) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Move to next card
          carouselRef.current.scrollTo({
            left: currentScroll + cardWidth,
            behavior: "smooth",
          });
        }
      }
    }, 3000); // Move every 3 seconds

    return () => clearInterval(autoScroll);
  }, [isDragging]);

  return (
    <section id="about" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Main Content with Image */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-6">
              ¿Por qué elegirnos?
            </h2>

            <div className="w-2/3 sm:w-1/3 lg:w-2/3 xl:w-2/3 h-0.5 bg-white mb-6 sm:mb-8"></div>

            <div className="space-y-4 sm:space-y-6 text-white leading-relaxed text-lg sm:text-xl lg:text-2xl">
              <p>
                Cuando las ideas se quedan en papel o los proyectos se frenan
                por falta de tiempo o equipo, ahí{" "}
                <span className="bg-[#CCFF00] text-black px-2 py-1  font-semibold">
                  entra Roots.
                </span>
              </p>

              <p>
                Nos enfocamos en{" "}
                <span className="bg-[#CCFF00] text-black px-2 py-1  font-semibold">
                  convertir tu idea en un producto digital real, funcional y
                  escalable
                </span>
                . Porque entendemos que{" "}
                <span className="bg-[#CCFF00] text-black px-2 py-1  font-semibold">
                  cada proyecto necesita raíces sólidas para crecer
                </span>
                .
              </p>
            </div>
          </div>

          {/* Image - Responsive dimensions */}
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <div className="relative w-full max-w-[280px] sm:w-[280px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/about.png"
                alt="Equipo de trabajo colaborativo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Draggable Carousel */}
        <div className="w-full">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {cards.map((card, index) => {
              const IconComponent = card.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 border-2 border-black rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg w-72 sm:w-80 ${
                    isEven ? "bg-white" : "bg-[#CCFF00]"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-4 sm:mb-6">
                      <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-black" />
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-black leading-tight">
                      {card.text}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Button */}
      {showFloatingButton && (
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={scrollToTop}
            className="bg-[#CCFF00] hover:bg-[#B8E600] text-black font-bold py-2 px-4 sm:py-4 sm:px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
          >
            <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Volver al inicio</span>
            <span className="sm:hidden">↑</span>
          </button>
        </div>
      )}
    </section>
  );
}
