"use client";

import { Code, Smartphone, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Code,
    title: "Software a Medida",
    description:
      "Creamos soluciones tecnológicas adaptadas a tu negocio para optimizar procesos, reducir costos y ayudarte a crecer.",
    buttonText: "Trabajemos juntos",
  },
  {
    icon: Smartphone,
    title: "Desarrollo Web & Mobile",
    description:
      "Diseñamos y desarrollamos sitios web y aplicaciones modernas, rápidas y escalables que conectan tu marca con tus clientes.",
    buttonText: "Trabajemos juntos",
  },
  {
    icon: Lightbulb,
    title: "Innovación y Flexibilidad",
    description:
      "Nos adaptamos a las necesidades únicas de cada cliente, acompañándote con la tecnología que tu proyecto necesita para despegar.",
    buttonText: "Trabajemos juntos",
  },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Primera sección: Transformamos ideas en soluciones que generan impacto */}
        <div className="text-center mb-16 sm:mb-24 lg:mb-32">
          <h2
            className={`font-bold text-black mb-6 sm:mb-8 leading-tight transition-all duration-1000 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Transformamos ideas en
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            soluciones que{" "}
            <span
              style={{ backgroundColor: "#CCFF00" }}
              className="px-1 sm:px-2"
            >
              generan impacto
            </span>
          </h2>
          <p
            className={`max-w-4xl lg:max-w-5xl mx-auto leading-relaxed transition-all duration-1000 delay-200 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ fontWeight: "500" }}
          >
            <span style={{ color: "#8E9196" }}>
              Desarrollamos MVPs funcionales y escalables, con soluciones
              tecnológicas de
            </span>{" "}
            <span style={{ color: "#000000" }}>
              alto impacto y bajo presupuesto
            </span>
            .
          </p>
        </div>

        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-5xl font-bold text-black mb-8 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            ¿Qué hacemos?
          </h2>
          <p
            className={`text-2xl text-black max-w-5xl mx-auto transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Acompañamos a{" "}
            <span style={{ backgroundColor: "#CCFF00" }} className="px-1">
              startups y empresas
            </span>{" "}
            en el desarrollo de sus primeros productos digitales. Creamos MVPs
            funcionales, escalables y accesibles, combinando diseño, tecnología
            y estrategia para validar ideas en el menor tiempo y con el menor
            costo posible.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col w-full sm:w-80 md:w-96 lg:w-96 xl:w-96"
                style={{
                  maxWidth: "376.26px",
                  height: "480.76px",
                  width: "376.26px",
                }}
              >
                {/* Header negro con icono y título */}
                <div className="bg-black p-6 flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#CCFF00" }}
                  >
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {feature.title}
                  </h3>
                </div>

                {/* Cuerpo blanco con descripción y botón */}
                <div className="p-6 flex flex-col flex-grow text-center items-center justify-center">
                  <p
                    className="mb-16 leading-relaxed  font-bold items-center justify-center"
                    style={{ color: "#5D6571", fontSize: "20px" }}
                  >
                    {feature.description}
                  </p>

                  <button
                    onClick={scrollToContact}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {feature.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
