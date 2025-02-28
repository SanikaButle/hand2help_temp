"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, MessageCircle, X } from "lucide-react";
import remarkGfm from "remark-gfm";

const ChatbotPopup = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", { question: input });
      const botMessage = { role: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "⚠ Error: Unable to get a response" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-full shadow-xl transition-all transform 
            ${!isOpen ? "animate-bounce" : ""} // Stops bouncing when open
        `}
        >
        {isOpen ? (
            <X size={32} className="transition-transform transform rotate-90" /> // Enlarged icon
        ) : (
            <MessageCircle size={32} /> // Enlarged icon
        )}
    </button>



      {/* Chatbox Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-0 w-96 h-5/6 bg-white shadow-lg rounded-lg flex flex-col border border-gray-300">
          {/* Chat Header */}
          <div className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-t-lg">
            <span className="text-lg font-bold">💬 AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={chatRef} className="p-3 h-5/6 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-2 max-w-[75%] rounded-lg ${
                    msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-blue-400 text-white p-2 rounded-lg animate-pulse">Typing...</div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 flex items-center border-t border-gray-300">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 rounded-lg text-white">
              {loading ? <Loader2 className="animate-spin" /> : <Send />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPopup;
