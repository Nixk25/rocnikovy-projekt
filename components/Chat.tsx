"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className="flex flex-col w-full my-20 h-[80vh] ">
      <div className="flex flex-col justify-end h-full">
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </li>
          ))}
        </ul>

        <form className="flex gap-5 px-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Zeptejte se na cokoliv..."
            value={input}
            onChange={handleInputChange}
          />

          <Button className="text-white" type="submit">
            Send
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
