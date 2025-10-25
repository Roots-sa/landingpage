"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserData {
  name?: string;
  email?: string;
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
        addMessage("¡Hola! 👋 ¿En qué puedo ayudarte hoy?", false);
      }, 500);
    }
  }, [isOpen]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Respuestas por palabras clave
    if (
      message.includes("precio") ||
      message.includes("costo") ||
      message.includes("cuánto")
    ) {
      return "Nuestros precios varían según el proyecto. Ofrecemos MVPs desde $2,000 USD hasta soluciones empresariales completas. ¿Te gustaría que te envíe más detalles por email?";
    }

    if (
      message.includes("servicio") ||
      message.includes("qué hacen") ||
      message.includes("servicios")
    ) {
      return "Desarrollamos software a medida, aplicaciones web y móviles, y soluciones de innovación. Nos especializamos en MVPs funcionales y escalables. ¿Hay algún servicio específico que te interese?";
    }

    if (
      message.includes("contacto") ||
      message.includes("hablar") ||
      message.includes("reunión")
    ) {
      return "¡Perfecto! Me encantaría conectar contigo. ¿Podrías dejarme tu nombre y email para que nuestro equipo se ponga en contacto contigo?";
    }

    if (message.includes("gracias") || message.includes("muchas gracias")) {
      return "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?";
    }

    if (
      message.includes("hola") ||
      message.includes("buenos días") ||
      message.includes("buenas tardes")
    ) {
      return "¡Hola! 😊 Me da mucho gusto saludarte. ¿En qué puedo ayudarte hoy?";
    }

    if (
      message.includes("adiós") ||
      message.includes("chau") ||
      message.includes("hasta luego")
    ) {
      return "¡Hasta luego! Fue un placer ayudarte. Si necesitas algo más, aquí estaré. 👋";
    }

    if (message.includes("proyecto") || message.includes("idea")) {
      return "¡Excelente! Nos encanta escuchar sobre nuevos proyectos. ¿Podrías contarme un poco más sobre tu idea? También me gustaría saber tu nombre y email para conectar contigo.";
    }

    // Respuesta por defecto
    return "Interesante pregunta. ¿Te gustaría que te conecte con nuestro equipo para una consulta más detallada? Puedo tomar tu nombre y email.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, true);
    setInputValue("");
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(async () => {
      const botResponse = getBotResponse(userMessage);
      addMessage(botResponse, false);
      setIsTyping(false);

      // Si el bot está pidiendo datos del usuario
      if (botResponse.includes("nombre") && botResponse.includes("email")) {
        setIsCollectingData(true);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const collectUserData = () => {
    if (userData.name && userData.email) {
      addMessage(
        `Perfecto ${userData.name}, he guardado tu información. Te contactaremos pronto en ${userData.email}. ¿Hay algo más en lo que pueda ayudarte?`,
        false
      );
      setIsCollectingData(false);

      // Enviar email con el historial del chat
      sendChatSummary();
    } else {
      addMessage(
        "Por favor, completa tu nombre y email para continuar.",
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

  const handleDataInput = (field: "name" | "email", value: string) => {
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
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
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
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs px-4 py-2 rounded-2xl">
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
                  onClick={handleSendMessage}
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
