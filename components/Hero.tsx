"use client";

import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/background-1.png')",
        }}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="relative group cursor-pointer overflow-hidden">
              <img
                src="/assets/logo.png"
                alt="Roots Logo"
                className="w-8 h-8 sm:w-auto sm:h-auto"
              />
              <div
                className="absolute inset-0 w-8 h-8 sm:w-auto sm:h-auto transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-bottom"
                style={{
                  background: `linear-gradient(to top, #CCFF00 0%, #CCFF00 100%)`,
                  WebkitMaskImage: "url('/assets/logo.png')",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url('/assets/logo.png')",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">
                Roots
              </h1>
              <p className="text-white font-bold text-xs sm:text-sm">
                Innovación desde la raíz
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center space-x-4 lg:space-x-8">
            <a
              href="#features"
              className="text-white font-bold text-sm lg:text-lg hover:transition-colors"
              style={{ "--hover-color": "#CCFF00" } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#CCFF00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              Servicios
            </a>
            <a
              href="#about"
              className="text-white font-bold text-sm lg:text-lg hover:transition-colors"
              style={{ "--hover-color": "#CCFF00" } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#CCFF00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              Nosotros
            </a>
            <a
              href="#contact"
              className="bg-white text-black font-bold text-sm lg:text-lg px-3 py-2 lg:px-4 lg:py-4 rounded-md hover:bg-gray-100 transition-colors inline-block"
            >
              ESCRIBINOS
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight animate-fade-in">
            Creamos <span style={{ color: "#CCFF00" }}>tecnología</span> que
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            crece desde la <span style={{ color: "#CCFF00" }}>raíz</span>.
          </h2>
        </div>
      </div>
    </section>
  );
}
