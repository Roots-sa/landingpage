import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo Section - Centered */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
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
              <h1 className="text-white text-start font-bold text-2xl sm:text-3xl lg:text-4xl">
                Roots
              </h1>
              <p className="text-white font-bold text-xs sm:text-sm">
                Innovación desde la raíz
              </p>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-white mb-8"></div>

        {/* Bottom Section - Social Icons and Email */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Social Icons */}
          <div className="flex space-x-3 sm:space-x-4">
            <a
              href="#"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-white transition-colors duration-300" />
            </a>
            <a
              href="#"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-white transition-colors duration-300" />
            </a>
            <a
              href="mailto:info.roots@gmail.com"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
