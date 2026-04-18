import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, User, Loader2, Mic, Square } from 'lucide-react';
import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const submitLead: FunctionDeclaration = {
  name: "submitLeadForm",
  description: "Submit the lead information and chat summary directly to the agency's onboarding form. Use this when the user is ready to apply and you have gathered enough basic context (name, email, goals, etc.).",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Lead's name, if provided. Or write 'Not provided'." },
      email: { type: Type.STRING, description: "Lead's email, if provided. Or write 'Not provided'." },
      bottleneck: { type: Type.STRING, description: "Summary of their business size, goals, bottlenecks, and chat context." }
    },
    required: ["name", "email", "bottleneck"]
  }
};

const SYSTEM_INSTRUCTION = `You are Faizan, a friendly and helpful AI assistant for Faizan Saleem Digital Agency.
Your goal is to chat with visitors, explain how we can help them grow their business, and guide them to our services.
Keep your answers VERY short, simple, and easy to read. Talk in the same language the user speaks to you in.

CRITICAL RULES:
- NEVER use markdown formatting. No bold, no italics, no asterisks, no bullet points. Use plain text only.
- Answer in 1 to 3 short sentences maximum. Be conversational and human.
- Tone: User-friendly, warm, simple, encouraging.

We offer these 6 packages:
1. Starter Engine - $1000/mo
2. Growth Accelerator - $2500/mo
3. Market Presence - $4500/mo
4. Category Leader - $7000/mo
5. Fractional CMO - $10000/mo
6. Enterprise Custom

Ask simple questions about their business goals or challenges. Once you understand what they need, you must collect their name and email, and then CALL the submitLeadForm function. After you call it, tell them: "I've successfully submitted your application to our team using the link you shared! We'll reach out shortly."
If they want to open the traditional form manually instead, you can just use the exact keyword: [OPEN_FORM].
If you don't know the answer, politely ask them to email contact@faizansaleem.studio or WhatsApp +1 555-843-0010.`;

type Message = { role: 'user' | 'model'; text: string; audioData?: string; mimeType?: string };

export function ChatBot({ openForm }: { openForm: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hey! I'm Faizan. How can I help you scale your business today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (audioBlob?: Blob) => {
    const userMessage = input.trim();
    if (!userMessage && !audioBlob) return;

    setInput('');
    setIsLoading(true);

    let base64Audio = '';
    let mimeType = '';

    if (audioBlob) {
      setMessages(prev => [...prev, { role: 'user', text: '🎤 Voice Message' }]);
      const reader = new FileReader();
      base64Audio = await new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.readAsDataURL(audioBlob);
      });
      mimeType = audioBlob.type;
    } else {
      setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    }

    try {
      const chatContents = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      
      if (audioBlob) {
        chatContents.push({ 
          role: 'user', 
          parts: [{ inlineData: { data: base64Audio, mimeType } }] 
        });
      } else {
        chatContents.push({ role: 'user', parts: [{ text: userMessage }] });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: chatContents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          tools: [{ functionDeclarations: [submitLead] }]
        }
      });

      let botText = response.text || "";

      // Check for function calls (Form submission)
      const calls = response.functionCalls;
      if (calls && calls.length > 0) {
        const call = calls[0];
        if (call.name === "submitLeadForm" && call.args) {
          const { name, email, bottleneck } = call.args as any;
          // Send directly to the formspree link
          await fetch('https://formspree.io/f/xaqaokak', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, bottleneck, formType: 'Bot Summarized Onboarding Request' })
          });
          botText = botText || "I've successfully submitted your application to our team using the link you shared! We'll reach out shortly.";
        }
      } else if (!botText) {
        botText = "I was unable to process that. Could you reach out to contact@faizansaleem.studio instead?";
      }
      
      // Check for the manual trigger token
      if (botText.includes('[OPEN_FORM]')) {
        botText = botText.replace('[OPEN_FORM]', '');
        openForm();
      }

      setMessages(prev => [...prev, { role: 'model', text: botText.trim() }]);
      
      // If the user sent a voice message, strictly respond with voice
      if (audioBlob) {
        speakText(botText.trim());
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to my network right now. Please email us at contact@faizansaleem.studio or WhatsApp +1 555-843-0010." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current?.mimeType || 'audio/webm' });
        handleSend(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access is required to send voice messages.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      <a 
        href="https://wa.me/15558430010"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[#25D366]/50 hover:shadow-2xl transition-all z-40"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-24 w-[60px] h-[60px] bg-electric-blue text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-electric-blue/50 hover:shadow-2xl transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <Bot className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-24 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-48px)] bg-[#0F1216] border border-white/10 shadow-2xl shadow-black/80 rounded-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center border border-electric-blue/30 relative">
                  <Bot className="w-5 h-5 text-electric-blue" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Faizan Assistant</h3>
                  <p className="text-slate-400 text-xs">Growth Engineering Agent</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                }} 
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${msg.role === 'user' ? 'bg-electric-blue text-white rounded-tr-sm' : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-4 flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-electric-blue animate-spin" />
                    <span className="text-xs text-slate-400 font-medium tracking-wide">Faizan is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0a0c0f]">
              <div className="flex items-center space-x-2 relative">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about our growth strategies..."
                    disabled={isRecording}
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-electric-blue transition-colors disabled:opacity-50"
                  />
                  {input.trim() && (
                    <button 
                      onClick={() => handleSend()}
                      disabled={isLoading}
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-electric-blue text-white flex items-center justify-center disabled:opacity-50 hover:brightness-110 transition-all"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  )}
                </div>
                
                {!input.trim() && (
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isLoading}
                    className={`w-11 h-11 shrink-0 rounded-full text-white flex items-center justify-center disabled:opacity-50 transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
                    aria-label={isRecording ? "Stop Recording" : "Start Recording"}
                  >
                    {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
              </div>
              {isRecording && <div className="text-center mt-2 text-xs text-red-500 animate-pulse">Recording voice message... tap to send</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
