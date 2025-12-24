"use client"

import { useState, useRef, useEffect } from "react"
import {
  MessageCircle,
  X,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// AI Team Members
const aiMembers = [
  {
    id: "max",
    name: "พี่มักซ์",
    emoji: "🖥️",
    role: "ผู้นำทีม",
    color: "blue",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
    description: "ช่วยวางแผนและจัดการงานทั่วไป",
  },
  {
    id: "port",
    name: "น้องพอร์ต",
    emoji: "🎨",
    role: "UI/UX",
    color: "pink",
    bgColor: "bg-pink-500",
    textColor: "text-pink-500",
    borderColor: "border-pink-500",
    description: "ช่วยเรื่องการออกแบบและ UI",
  },
  {
    id: "gemini",
    name: "เจมินี่",
    emoji: "💎",
    role: "Research",
    color: "purple",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    borderColor: "border-purple-500",
    description: "ช่วยค้นคว้าและวิเคราะห์ข้อมูล",
  },
]

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  aiId?: string
  timestamp: Date
}

interface ChatPanelProps {
  className?: string
}

export function ChatPanel({ className }: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAI, setSelectedAI] = useState(aiMembers[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "สวัสดีครับ! ผมพี่มักซ์ ผู้นำทีม AI พร้อมช่วยเหลือคุณครับ 🖥️",
      aiId: "max",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Handle AI selection
  const handleSelectAI = (ai: typeof aiMembers[0]) => {
    setSelectedAI(ai)
    const greetings: Record<string, string> = {
      max: "สวัสดีครับ! ผมพี่มักซ์ พร้อมช่วยวางแผนและจัดการงานครับ 🖥️",
      port: "สวัสดีค่ะ! น้องพอร์ตพร้อมช่วยเรื่อง UI/UX และการออกแบบค่ะ 🎨",
      gemini: "สวัสดีครับ! ผมเจมินี่ พร้อมช่วยค้นคว้าและวิเคราะห์ข้อมูลครับ 💎",
    }
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: greetings[ai.id],
        aiId: ai.id,
        timestamp: new Date(),
      },
    ])
  }

  // Send message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string[]> = {
        max: [
          "เข้าใจครับ ผมจะช่วยจัดการให้ครับ",
          "ดีครับ ให้ผมวางแผนให้นะครับ",
          "รับทราบครับ จะดำเนินการให้ทันที",
        ],
        port: [
          "ได้เลยค่ะ น้องจะช่วยออกแบบให้ค่ะ",
          "น่าสนใจค่ะ ให้น้องดูรายละเอียดก่อนนะคะ",
          "เข้าใจค่ะ น้องจะทำให้สวยงามค่ะ",
        ],
        gemini: [
          "ผมจะค้นคว้าข้อมูลให้ครับ",
          "น่าสนใจครับ ให้ผมวิเคราะห์ดูก่อนนะครับ",
          "รับทราบครับ ผมจะหาข้อมูลเพิ่มเติมให้",
        ],
      }

      const aiResponses = responses[selectedAI.id]
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: randomResponse,
        aiId: selectedAI.id,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 transition-all duration-300",
          selectedAI.bgColor,
          "hover:scale-110",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
          className
        )}
      >
        {/* Header */}
        <div className={cn("px-4 py-3 flex items-center gap-3", selectedAI.bgColor)}>
          <Avatar className="w-10 h-10 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {selectedAI.emoji}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-white">
            <h3 className="font-semibold">{selectedAI.name}</h3>
            <p className="text-xs text-white/80">{selectedAI.role}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className="text-white hover:bg-white/20"
          >
            {voiceEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* AI Selector */}
        <div className="px-4 py-3 border-b dark:border-gray-700 flex gap-2">
          {aiMembers.map((ai) => (
            <button
              key={ai.id}
              onClick={() => handleSelectAI(ai)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
                selectedAI.id === ai.id
                  ? `${ai.bgColor} text-white`
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <span className="text-lg">{ai.emoji}</span>
              <span className="text-xs font-medium">{ai.name}</span>
            </button>
          ))}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={cn(selectedAI.bgColor, "text-white text-sm")}>
                      {selectedAI.emoji}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl",
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {msg.timestamp.toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {msg.role === "user" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-gray-500 text-white text-sm">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={cn(selectedAI.bgColor, "text-white text-sm")}>
                    {selectedAI.emoji}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="px-4 py-3 border-t dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 rounded-xl"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn("rounded-xl", selectedAI.bgColor, "hover:opacity-90")}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Team พร้อมช่วยเหลือคุณ
          </p>
        </div>
      </div>
    </>
  )
}

export default ChatPanel
