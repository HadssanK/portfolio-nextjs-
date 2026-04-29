"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// ─── Render **bold** markdown in plain text responses ────────────────────────
function renderContent(text) {
  // Split on **...** and render bold spans
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Suggested quick-start questions ─────────────────────────────────────────
const QUICK_QUESTIONS = [
  "Show me his projects",
  "What skills does he have?",
  "What services does he offer?",
  "Tell me about Muhammad Hassan",
  "How can I contact him?",
];

// ─── Single chat message ──────────────────────────────────────────────────────
function ChatMessage({ message, isLatest }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
          isUser
            ? "bg-gradient-to-br from-orange-400 to-orange-600"
            : "bg-gradient-to-br from-gray-700 to-gray-800 border border-orange-500/30"
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-orange-400" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
          isUser
            ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-tr-sm"
            : "bg-gray-800/90 border border-white/5 text-gray-100 rounded-tl-sm"
        }`}
      >
        {renderContent(message.content)}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex gap-3 flex-row"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 border border-orange-500/30 shadow-md">
        <Bot size={14} className="text-orange-400" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gray-800/90 border border-white/5 shadow-sm flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Hassan's AI assistant.\n\nAsk me anything about his projects, skills, services, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback((force = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 80;
    if (force || isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isLoading, scrollToBottom]);

  // Show/hide "scroll to bottom" button
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setShowScrollDown(distFromBottom > 120);
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Build history for the API (exclude welcome message)
  const buildHistory = useCallback((msgs) =>
    msgs
      .filter((m) => m.id !== "welcome")
      .map(({ role, content }) => ({ role, content })),
    []
  );

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            message: trimmed,
            history: buildHistory([...messages, userMsg]),
          }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          setMessages((prev) => [
            ...prev,
            {
              id: `e-${Date.now()}`,
              role: "assistant",
              content: data.error || "Something went wrong. Please try again.",
              error: true,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `a-${Date.now()}`,
              role: "assistant",
              content: data.reply,
            },
          ]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setMessages((prev) => [
            ...prev,
            {
              id: `e-${Date.now()}`,
              role: "assistant",
              content: "Connection error. Please check your network and try again.",
              error: true,
            },
          ]);
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages, buildHistory]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleQuickQuestion = (q) => sendMessage(q);

  const clearChat = () => {
    if (abortRef.current) abortRef.current.abort();
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm Hassan's AI assistant.\n\nAsk me anything about his projects, skills, services, or how to get in touch.",
      },
    ]);
    setIsLoading(false);
    setInput("");
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <motion.button
        id="chatbot-toggle-btn"
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white cursor-pointer focus:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-40 pointer-events-none" />
        )}
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/30">
                  <Bot size={18} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">
                    Hassan's Assistant
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Sparkles size={10} className="text-orange-400" />
                    AI-powered · Portfolio Data
                  </p>
                </div>
              </div>

              {/* Clear button */}
              <button
                id="chatbot-clear-btn"
                onClick={clearChat}
                className="text-xs text-gray-400 hover:text-orange-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
                title="Clear chat"
              >
                Clear
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/95 scroll-smooth"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#374151 transparent" }}
            >
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isLatest={i === messages.length - 1}
                />
              ))}

              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollDown && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scrollToBottom(true)}
                  className="absolute bottom-24 right-4 z-10 w-8 h-8 rounded-full bg-gray-700 border border-white/10 flex items-center justify-center text-gray-300 hover:text-orange-400 shadow-lg cursor-pointer"
                >
                  <ChevronDown size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quick Questions */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-3 py-2 bg-gray-900/95 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-2 px-1">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickQuestion(q)}
                      className="text-xs px-2.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 hover:border-orange-500/60 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 bg-gray-900/95 border-t border-white/8 flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                id="chatbot-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, services…"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-gray-800/80 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 transition-all disabled:opacity-50"
                style={{ minHeight: "40px", maxHeight: "100px" }}
              />
              <motion.button
                id="chatbot-send-btn"
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
