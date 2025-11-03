"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2, Mic, MicOff, Volume2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const INITIAL_MESSAGE = {
    id: "1",
    text: "Hi! I'm KaushalSetu AI. I can help you with career guidance, college information, and course selection. How can I assist you today?",
    sender: "bot",
    timestamp: new Date()
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [messages, setMessages] = useState([INITIAL_MESSAGE])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [voiceMode, setVoiceMode] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const messagesEndRef = useRef(null)
    const recognitionRef = useRef(null)

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

            recognitionRef.current.onerror = () => {
                setIsListening(false)
            }

            recognitionRef.current.onend = () => {
                setIsListening(false)
            }
        }
    }, [])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userQuery: inputValue }),
        });

        const { chatbotResponse } = await response.json();

        // Simulate API call delay
        setTimeout(() => {
            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: chatbotResponse,
                sender: "bot",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)

            // Text-to-speech for bot response if voice mode is enabled
            if (voiceMode && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(botMessage.text)
                utterance.rate = 0.8
                utterance.pitch = 1
                speechSynthesis.speak(utterance)
            }
        }, 1500)
    }

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

    const formatTime = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const getContainerSize = () => {
        if (isMaximized) return "m-0 w-full h-full"
        if (isMinimized) return "w-[350px] h-14"
        return "w-[400px] h-[580px]"
    }

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border border-white/10 dark:border-purple-500/20"
                >
                    <MessageCircle className="h-6 w-6 text-white" />
                </Button>
                <div className="absolute -top-2 -right-2">
                    <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 text-white border border-white dark:border-black">
                        AI
                    </Badge>
                </div>
            </div>
        )
    }

    return (
        <div className={`fixed z-50 transition-all duration-300 ${isMaximized ? 'inset-0 p-0' : 'bottom-6 right-6'}`}>
            <Card 
                className={`${getContainerSize()} transition-all duration-300 overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl ${isMaximized ? 'rounded-none' : 'rounded-2xl'} flex flex-col`}
            >
                {/* Fixed Header */}
                <div className="sticky top-0 z-10">
                    <CardHeader className="p-0 flex flex-row items-center justify-between bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-14 shadow-sm">
                        <div className="flex items-center space-x-3 px-4">
                            <div className="relative">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-900"></div>
                            </div>
                            <div className="flex flex-col">
                                <CardTitle className="text-sm font-bold m-0 p-0">KaushalSetu AI</CardTitle>
                                {!isMinimized && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 m-0 p-0">Career Guidance</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center px-2">
                            {!isMinimized && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setVoiceMode(!voiceMode)}
                                    className={`h-7 w-7 rounded-full ${voiceMode ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}
                                >
                                    <Volume2 className="h-4 w-4" />
                                </Button>
                            )}
                            {!isMinimized && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMaximized(!isMaximized)}
                                    className="h-7 w-7 rounded-full text-gray-500 dark:text-gray-400"
                                >
                                    <Maximize2 className="h-4 w-4" />
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="h-7 w-7 rounded-full text-gray-500 dark:text-gray-400"
                            >
                                <Minimize2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setIsOpen(false)
                                    setIsMaximized(false)
                                    setIsMinimized(false)
                                }}
                                className="h-7 w-7 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                </div>

                {!isMinimized && (
                    <div className="flex flex-col flex-grow overflow-hidden">
                        {/* Messages Area */}
                        <ScrollArea className="flex-grow p-4 bg-gray-50 dark:bg-black">
                            <div className="space-y-4 pb-2">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                                    >
                                        <div className={`flex items-end space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                            {message.sender === 'user' ? (
                                                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mb-1 flex-shrink-0">
                                                    <User className="h-3.5 w-3.5 text-white" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mb-1 flex-shrink-0">
                                                    <Bot className="h-3.5 w-3.5 text-white" />
                                                </div>
                                            )}
                                            
                                            <div 
                                                className={`rounded-2xl p-3 text-sm ${
                                                    message.sender === 'user' 
                                                        ? 'bg-indigo-500 text-white rounded-tr-none' 
                                                        : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                                                }`}
                                            >
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                                <p className={`text-[10px] mt-1 text-right ${
                                                    message.sender === 'user' 
                                                        ? 'text-indigo-100' 
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {formatTime(message.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start animate-in fade-in duration-200">
                                        <div className="flex items-end space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mb-1">
                                                <Bot className="h-3.5 w-3.5 text-white" />
                                            </div>
                                            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-3 rounded-tl-none">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Fixed Input Area at Bottom */}
                        <div className="p-3 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 sticky bottom-0 z-10">
                            <div className="flex items-center space-x-2">
                                <Textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Message KaushalSetu AI..."
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 min-h-[40px] max-h-[120px] resize-none bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus-visible:ring-1 focus-visible:ring-indigo-500 text-sm"
                                    rows={1}
                                />
                                <div className="flex space-x-1">
                                    <Button
                                        onClick={isListening ? stopListening : startListening}
                                        size="icon"
                                        variant="ghost"
                                        className={`rounded-full h-9 w-9 ${
                                            isListening 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                        }`}
                                        disabled={isTyping}
                                    >
                                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        onClick={handleSendMessage}
                                        size="icon"
                                        disabled={!inputValue.trim() || isTyping}
                                        className="rounded-full h-9 w-9 bg-indigo-500 hover:bg-indigo-600 text-white"
                                    >
                                        {isTyping ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            {isListening && (
                                <div className="text-xs text-center mt-2 text-purple-500 animate-pulse">
                                    Listening... speak now
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}