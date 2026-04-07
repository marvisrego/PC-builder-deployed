import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

let groq;
if (apiKey) {
  groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'SYSTEM ONLINE. I am the Quantum Rigs AI expert. How can I assist with your build?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !groq) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are an advanced AI assistant for Quantum Rigs, a premium cyber-minimalist PC builder website. Give concise, expert advice about PC components, compatibility, and builds. Keep responses somewhat technical but accessible.' },
          ...messages,
          userMsg
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiResponse = chatCompletion.choices[0]?.message?.content || 'NO RESPONSE RECEIVED.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'ERROR: Unable to communicate with mainframe.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-electric text-slate-900 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-shadow z-50 flex items-center justify-center font-bold uppercase tracking-widest border border-electric"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-slate-900/90 backdrop-blur-xl border border-electric rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-electric/30 bg-slate-950 flex items-center gap-3">
              <Bot className="w-6 h-6 text-electric" />
              <div>
                <h3 className="font-bold text-electric uppercase tracking-widest text-sm">Quantum AI</h3>
                <p className="text-slate-400 text-xs uppercase tracking-wider">Build Advisor</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {!apiKey && (
                <div className="p-3 rounded-lg bg-red-900/50 border border-red-500 text-red-200 text-sm">
                  WARNING: Missing API Key. AI features are offline.
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-electric/50 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-electric" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-electric text-slate-900 rounded-tr-sm'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-electric/20 border border-electric flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-electric" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                   <div className="w-8 h-8 rounded-full bg-slate-800 border border-electric/50 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-electric" />
                    </div>
                  <div className="p-3 rounded-2xl text-sm bg-slate-800 text-electric border border-slate-700 rounded-tl-sm animate-pulse">
                    Processing query...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-electric/30 bg-slate-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your build..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-electric transition-colors"
                  disabled={isLoading || !apiKey}
                />
                <button
                  type="submit"
                  disabled={isLoading || !apiKey || !input.trim()}
                  className="bg-electric text-slate-900 p-2 rounded-lg font-bold disabled:opacity-50 hover:bg-cyan-400 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
