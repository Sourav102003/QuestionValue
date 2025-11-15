import { useState } from "react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/apis/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.reply || "No reply received",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting server" },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">🤖 Smart ChatBot</h2>

        <div className="flex-1 overflow-y-auto h-96 border p-3 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-300 text-black mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-300 text-black p-2 rounded-lg w-fit mr-auto">
              Typing...
            </div>
          )}
        </div>

        <div className="flex mt-4 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 border rounded-lg px-3 py-2"
            placeholder="Ask something..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
