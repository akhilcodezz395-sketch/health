import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Brain } from "lucide-react";
import { analyzeSymptoms } from "@/services/symptomService";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const SymptomCheckerChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user's message
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    const userInput = input;
    setInput("");
    setLoading(true);
    setProgress(10);

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 5 : prev));
    }, 200);

    try {
      const result = await analyzeSymptoms(userInput);
      clearInterval(interval);
      setProgress(100);

      // Add AI bot response
      const botMessage = Possible conditions: ${result.possibleConditions.map(c => c.name).join(", ")}. Recommendations: ${result.recommendations.join("; ")}.;
      setMessages(prev => [...prev, { sender: "bot", text: botMessage }]);
    } catch (err) {
      clearInterval(interval);
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, an error occurred. Please try again." }]);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container max-w-xl mx-auto">
          <Card className="p-4 flex flex-col gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Symptom Checker Chat
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 h-[500px] overflow-y-auto border p-3 rounded-md bg-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={flex ${msg.sender === "user" ? "justify-end" : "justify-start"}}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                      msg.sender === "user" ? "bg-primary text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </CardContent>

            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
              <Textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your symptoms..."
                className="flex-1 min-h-[50px]"
                required
              />
              <Button type="submit" disabled={loading}>
                Send
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SymptomCheckerChat;
