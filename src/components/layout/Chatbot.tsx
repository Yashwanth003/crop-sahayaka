import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, CornerDownLeft, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useLanguage();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, language }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMessage: Message = { role: 'assistant', content: data.reply };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 rounded-full h-16 w-16 shadow-lg accent-gradient hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="h-8 w-8 text-accent-foreground" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] flex flex-col h-[70vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Bot /> AgriBot Assistant
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              <div className="chat-bubble-bot">
                {t('chat_welcome')}
              </div>
              {messages.map((msg, index) => (
                <div key={index} className={msg.role === 'user' ? "chat-bubble-user" : "chat-bubble-bot"}>
                  {msg.content}
                </div>
              ))}
              {isLoading && <div className="chat-bubble-bot animate-pulse">{t('chat_thinking')}</div>}
            </div>
          </ScrollArea>
          
          <DialogFooter className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat_placeholder')}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}