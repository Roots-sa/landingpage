import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo Section - Centered */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <img
              src="/assets/logo.png"
              alt="Roots Logo"
              className="w-8 h-8 sm:w-auto sm:h-auto"
            />
            <div className="flex flex-col -space-y-1">
              <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">
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
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </a>
            <a
              href="#"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </a>
            <a
              href="mailto:info.roots@gmail.com"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </a>
          </div>

          {/* Email */}
          <div className="text-white text-center sm:text-right">
            <span className="text-sm sm:text-base lg:text-lg">
              info.roots@gmail.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
