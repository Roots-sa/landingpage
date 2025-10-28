"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
}

interface UserData {
  name?: string;
  email?: string;
  whatsapp?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const [isCollectingData, setIsCollectingData] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensaje inicial cuando se abre el chat
      setTimeout(() => {
        addMessage(
          "¡Hola! 👋 Soy Roots Assistant. ¿En qué puedo ayudarte hoy?",
          false,
          [
            "¿Qué es un MVP?",
            "¿Qué servicios ofrecen?",
            "Precios",
            "Quiero contactar",
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addMessage = (text: string, isUser: boolean, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      options: options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const getBotResponse = (
    userMessage: string
  ): { text: string; options?: string[] } => {
    const message = userMessage.toLowerCase();

    // Respuesta sobre MVP
    if (
      message.includes("mvp") ||
      message.includes("qué es un mvp") ||
      message.includes("que es un mvp")
    ) {
      return {
        text: "Un MVP (Minimum Viable Product o Producto Mínimo Viable) es la versión más simple de tu producto que incluye solo las funcionalidades esenciales para resolver el problema principal de tus usuarios. 🚀\n\nBeneficios:\n✅ Lanzamiento rápido al mercado\n✅ Menor inversión inicial\n✅ Validación de tu idea con usuarios reales\n✅ Iteración basada en feedback\n\nEn Roots te ayudamos a identificar las funcionalidades clave y desarrollar tu MVP en 4-8 semanas. ¿Te gustaría saber más?",
        options: ["Precios de MVP", "¿Qué incluye un MVP?", "Quiero contactar"],
      };
    }

    // Respuestas por palabras clave
    if (
      message.includes("precio") ||
      message.includes("costo") ||
      message.includes("cuánto")
    ) {
      return {
        text: "Nuestros precios varían según el proyecto. Ofrecemos MVPs desde $2,000 USD hasta soluciones empresariales completas. ¿Te gustaría que te envíe más detalles por email?",
        options: ["Sí, quiero más información", "¿Qué servicios ofrecen?"],
      };
    }

    if (
      message.includes("servicio") ||
      message.includes("qué hacen") ||
      message.includes("servicios") ||
      message.includes("ofrecen")
    ) {
      return {
        text: "Desarrollamos software a medida, aplicaciones web y móviles, y soluciones de innovación. Nos especializamos en MVPs funcionales y escalables. ¿Hay algún servicio específico que te interese?",
        options: ["¿Qué es un MVP?", "Precios", "Tengo un proyecto"],
      };
    }

    if (
      message.includes("contacto") ||
      message.includes("contactar") ||
      message.includes("hablar") ||
      message.includes("reunión")
    ) {
      return {
        text: "¡Perfecto! Me encantaría conectar contigo. ¿Podrías dejarme tu nombre, email y WhatsApp para que nuestro equipo se ponga en contacto contigo?",
      };
    }

    if (message.includes("gracias") || message.includes("muchas gracias")) {
      return {
        text: "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?",
        options: ["¿Qué es un MVP?", "¿Qué servicios ofrecen?", "Precios"],
      };
    }

    if (
      message.includes("hola") ||
      message.includes("buenos días") ||
      message.includes("buenas tardes")
    ) {
      return {
        text: "¡Hola! 😊 Me da mucho gusto saludarte. ¿En qué puedo ayudarte hoy?",
        options: ["¿Qué es un MVP?", "¿Qué servicios ofrecen?", "Precios"],
      };
    }

    if (
      message.includes("adiós") ||
      message.includes("chau") ||
      message.includes("hasta luego")
    ) {
      return {
        text: "¡Hasta luego! Fue un placer ayudarte. Si necesitas algo más, aquí estaré. 👋",
      };
    }

    if (message.includes("proyecto") || message.includes("idea")) {
      return {
        text: "¡Excelente! Nos encanta escuchar sobre nuevos proyectos. ¿Podrías contarme un poco más sobre tu idea? También me gustaría saber tu nombre, email y WhatsApp para conectar contigo.",
      };
    }

    if (message.includes("incluye")) {
      return {
        text: "Un MVP típicamente incluye:\n📱 Funcionalidades core del producto\n🎨 Diseño UI/UX profesional\n💻 Desarrollo web o móvil\n🧪 Testing y QA\n🚀 Deployment en producción\n📊 Analytics básicos\n\n¿Te gustaría que hablemos sobre tu proyecto?",
        options: ["Sí, quiero más información", "Precios", "¿Qué es un MVP?"],
      };
    }

    // Respuesta por defecto
    return {
      text: "Interesante pregunta. ¿Te gustaría que te conecte con nuestro equipo para una consulta más detallada? Puedo tomar tu nombre, email y WhatsApp.",
      options: [
        "Sí, quiero contactar",
        "¿Qué es un MVP?",
        "¿Qué servicios ofrecen?",
      ],
    };
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    addMessage(messageToSend, true);
    setInputValue("");
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(async () => {
      const botResponse = getBotResponse(messageToSend);
      addMessage(botResponse.text, false, botResponse.options);
      setIsTyping(false);

      // Si el bot está pidiendo datos del usuario
      if (
        botResponse.text.includes("nombre") &&
        botResponse.text.includes("email")
      ) {
        setIsCollectingData(true);
      }
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const collectUserData = () => {
    if (userData.name && userData.email && userData.whatsapp) {
      addMessage(
        `Perfecto ${userData.name}, he guardado tu información. Te contactaremos pronto por email (${userData.email}) o WhatsApp (${userData.whatsapp}). ¿Hay algo más en lo que pueda ayudarte?`,
        false,
        ["¿Qué es un MVP?", "¿Qué servicios ofrecen?", "Gracias"]
      );
      setIsCollectingData(false);

      // Enviar email con el historial del chat
      sendChatSummary();
    } else {
      addMessage(
        "Por favor, completa todos los campos (nombre, email y WhatsApp) para continuar.",
        false
      );
    }
  };

  const sendChatSummary = async () => {
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
          messages,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Error sending chat summary:", error);
    }
  };

  const handleDataInput = (
    field: "name" | "email" | "whatsapp",
    value: string
  ) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold">Roots Assistant</h3>
                <p className="text-xs text-primary-100">En línea</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-sm px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                </div>
                {/* Botones de opciones */}
                {!message.isUser &&
                  message.options &&
                  message.options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="px-3 py-1.5 text-xs bg-white border-2 border-primary-600 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-200"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-sm px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Data Collection Form */}
          {isCollectingData && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={userData.name || ""}
                  onChange={(e) => handleDataInput("name", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  value={userData.email || ""}
                  onChange={(e) => handleDataInput("email", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Tu WhatsApp (ej: +1234567890)"
                  value={userData.whatsapp || ""}
                  onChange={(e) => handleDataInput("whatsapp", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={collectUserData}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 px-4 rounded-lg transition-colors"
                >
                  Enviar datos
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          {!isCollectingData && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
