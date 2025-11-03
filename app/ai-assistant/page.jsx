"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Mic, MicOff, Plus, Trash2, Edit3, Copy, Check, Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SAMPLE_CONVERSATIONS = [
    { id: 1, title: "Career Path in AI", date: "Today" },
    { id: 2, title: "Computer Science Colleges", date: "Yesterday" },
    { id: 3, title: "Study Abroad Options", date: "2 days ago" },
    { id: 4, title: "Engineering vs Medical", date: "1 week ago" },
]

const SUGGESTED_PROMPTS = [
    "What career paths are available in Computer Science?",
    "Help me choose between Engineering and Medical field",
    "What are the top colleges for MBA in India?",
    "How to prepare for JEE Main 2024?",
    "What skills do I need for a career in Data Science?",
    "Tell me about study abroad opportunities"
]

export default function AIAssistantPage() {
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [copiedId, setCopiedId] = useState(null)
    const [currentConversationId, setCurrentConversationId] = useState(null)
    const messagesEndRef = useRef(null)
    const textareaRef = useRef(null)
    const recognitionRef = useRef(null)
    const scrollAreaRef = useRef(null)

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = false
            recognitionRef.current.interimResults = false
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setInputValue(transcript)
                setIsListening(false)
            }

            recognitionRef.current.onerror = () => setIsListening(false)
            recognitionRef.current.onend = () => setIsListening(false)
        }
    }, [])

    // Send message function
    const handleSendMessage = async (messageText = null) => {
        const textToSend = messageText || inputValue.trim()
        if (!textToSend) return

        const userMessage = {
            id: Date.now(),
            text: textToSend,
            sender: "user",
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        try {
            // Simulate API call
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userQuery: textToSend }),
            })

            if (response.ok) {
                const { chatbotResponse } = await response.json()
                
                setTimeout(() => {
                    const botMessage = {
                        id: Date.now() + 1,
                        text: chatbotResponse,
                        sender: "bot",
                        timestamp: new Date()
                    }
                    setMessages(prev => [...prev, botMessage])
                    setIsTyping(false)
                }, 1000)
            } else {
                throw new Error('API call failed')
            }
        } catch (error) {
            console.error('Error:', error)
            // Fallback response
            setTimeout(() => {
                const botMessage = {
                    id: Date.now() + 1,
                    text: "I'm here to help with your career questions! Could you please rephrase your question?",
                    sender: "bot",
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, botMessage])
                setIsTyping(false)
            }, 1000)
        }
    }

    // Voice functions
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setIsListening(true)
            recognitionRef.current.start()
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    // Keyboard handling
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // Copy message
    const copyMessage = async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedId(messageId)
            setTimeout(() => setCopiedId(null), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    // New conversation
    const startNewConversation = () => {
        setMessages([])
        setCurrentConversationId(null)
    }

    // Format time
    const formatTime = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date)
    }

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/50 flex flex-col overflow-hidden shadow-xl`}>
                {sidebarOpen && (
                    <>
                        {/* Sidebar Header */}
                        <div className="p-4 border-b border-white/20 dark:border-gray-700/50 flex-shrink-0">
                            <Button 
                                onClick={startNewConversation}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-12 flex items-center justify-center gap-2 font-medium shadow-lg transition-all duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                New Conversation
                            </Button>
                        </div>

                        {/* Recent Conversations - Scrollable */}
                        <ScrollArea className="flex-1 p-4">
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">Recent Conversations</h3>
                            <div className="space-y-2">
                                {SAMPLE_CONVERSATIONS.map((conv) => (
                                    <div
                                        key={conv.id}
                                        className="group p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200/50 dark:hover:border-blue-800/50"
                                        onClick={() => setCurrentConversationId(conv.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                    {conv.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {conv.date}
                                                </p>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                                                    <Edit3 className="h-3 w-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Sidebar Footer - Fixed */}
                        <div className="p-4 border-t border-white/20 dark:border-gray-700/50 flex-shrink-0">
                            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/30 dark:border-blue-800/30">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">KaushalSetu AI</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Career Guidance Assistant</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden">
                {/* Header - Fixed */}
                <div className="h-14 border-b border-white/20 dark:border-gray-700/50 flex items-center justify-between px-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-sm flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                        >
                            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Career Guidance Assistant
                        </h1>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Online
                    </Badge>
                </div>

                {/* Messages Area - Scrollable */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <ScrollArea className="h-full" ref={scrollAreaRef}>
                        <div className="max-w-4xl mx-auto px-6 py-6">
                            {messages.length === 0 ? (
                                // Welcome Screen
                                <div className="text-center space-y-6 h-full flex flex-col justify-center min-h-[60vh]">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                                            <Bot className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                                Welcome to KaushalSetu AI
                                            </h2>
                                            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                                Your personal career guidance assistant. Ask me anything about career paths, 
                                                college admissions, courses, or professional development.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Suggested Prompts */}
                                    <div className="space-y-4">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                            Try asking me about:
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                                            {SUGGESTED_PROMPTS.map((prompt, index) => (
                                                <Card
                                                    key={index}
                                                    className="p-3 cursor-pointer hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                                                    onClick={() => handleSendMessage(prompt)}
                                                >
                                                    <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-relaxed">
                                                        {prompt}
                                                    </p>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Chat Messages
                                <div className="space-y-4 pb-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-300`}
                                        >
                                            <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                                {/* Avatar */}
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                                                    message.sender === 'user' 
                                                        ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                                                        : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                                                }`}>
                                                    {message.sender === 'user' ? (
                                                        <User className="h-3.5 w-3.5 text-white" />
                                                    ) : (
                                                        <Bot className="h-3.5 w-3.5 text-white" />
                                                    )}
                                                </div>

                                                {/* Message Content */}
                                                <div className={`rounded-2xl px-4 py-3 group relative shadow-lg backdrop-blur-sm ${
                                                    message.sender === 'user'
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 border border-white/30 dark:border-gray-700/50'
                                                }`}>
                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                        {message.text}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className={`text-xs ${
                                                            message.sender === 'user' 
                                                                ? 'text-blue-100' 
                                                                : 'text-gray-500 dark:text-gray-400'
                                                        }`}>
                                                            {formatTime(message.timestamp)}
                                                        </span>
                                                        
                                                        {message.sender === 'bot' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 dark:hover:bg-gray-700/50"
                                                                onClick={() => copyMessage(message.text, message.id)}
                                                            >
                                                                {copiedId === message.id ? (
                                                                    <Check className="h-3 w-3 text-green-500" />
                                                                ) : (
                                                                    <Copy className="h-3 w-3" />
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300">
                                            <div className="flex items-start gap-3">
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                                                    <Bot className="h-3.5 w-3.5 text-white" />
                                                </div>
                                                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-700/50">
                                                    <div className="flex gap-1 items-center">
                                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">KaushalSetu is thinking...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Input Area - Fixed at Bottom */}
                <div className="border-t border-white/20 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-4 shadow-lg flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-end gap-3">
                            {/* Voice Button */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={isListening ? stopListening : startListening}
                                className={`h-11 w-11 rounded-xl transition-all duration-200 border-white/30 dark:border-gray-700/50 ${
                                    isListening 
                                        ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg animate-pulse' 
                                        : 'bg-white/70 dark:bg-gray-800/70 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white backdrop-blur-sm'
                                }`}
                                disabled={isTyping}
                            >
                                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                            </Button>

                            {/* Text Input */}
                            <div className="flex-1 relative">
                                <Textarea
                                    ref={textareaRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me about your career, colleges, or courses..."
                                    className="min-h-[44px] max-h-24 resize-none bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                                    disabled={isTyping}
                                />
                                {isListening && (
                                    <div className="absolute inset-0 border-2 border-red-400 rounded-xl animate-pulse pointer-events-none" />
                                )}
                            </div>

                            {/* Send Button */}
                            <Button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                className="h-11 w-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500"
                            >
                                {isTyping ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {/* Voice Status */}
                        {isListening && (
                            <div className="mt-2 text-center">
                                <p className="text-xs bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent animate-pulse font-medium">
                                    🎤 Listening... Speak clearly
                                </p>
                            </div>
                        )}

                        {/* Input Hint */}
                        <div className="mt-2 text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Press <kbd className="px-1 py-0.5 bg-white/50 dark:bg-gray-700/50 rounded border text-xs">Enter</kbd> to send, 
                                <kbd className="px-1 py-0.5 bg-white/50 dark:bg-gray-700/50 rounded border text-xs ml-1">Shift + Enter</kbd> for new line
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}