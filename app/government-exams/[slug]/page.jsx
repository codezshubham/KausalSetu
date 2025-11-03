"use client"

import { use } from 'react'
import { useState, useEffect } from "react"
import Link from "next/link"
import {
    ChevronLeft,
    Building,
    GraduationCap,
    Calendar,
    Clock,
    Globe,
    Users,
    FileText,
    User,
    BookOpen,
    Briefcase,
    ExternalLink
} from "lucide-react"
import { governmentExamsData } from "@/data/governmentExamsData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ExamDetailPage({ params }) {
    const unwrappedParams = use(params)
    const [exam, setExam] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Find exam by slug
        const slug = unwrappedParams.slug
        const foundExam = governmentExamsData.find(exam =>
            generateSlug(exam.examName) === slug
        )

        setTimeout(() => {
            setExam(foundExam || null)
            setIsLoading(false)
        }, 500) // Simulate loading
    }, [unwrappedParams.slug])

    // Generate a slug for comparison
    const generateSlug = (examName) => {
        return examName
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    // Get domain color
    const getDomainColor = (domain) => {
        const colors = {
            "Civil Services": "bg-gradient-to-r from-amber-500 to-orange-600",
            "Banking": "bg-gradient-to-r from-green-500 to-emerald-600",
            "Defence": "bg-gradient-to-r from-blue-500 to-indigo-600",
            "Police": "bg-gradient-to-r from-purple-500 to-violet-600",
            "Central Government": "bg-gradient-to-r from-red-500 to-rose-600",
            "Railways": "bg-gradient-to-r from-cyan-500 to-sky-600",
            "Engineering": "bg-gradient-to-r from-fuchsia-500 to-pink-600",
            "Teaching": "bg-gradient-to-r from-lime-500 to-green-600",
            "Intelligence": "bg-gradient-to-r from-slate-500 to-gray-600",
            "Insurance": "bg-gradient-to-r from-amber-500 to-yellow-600",
            "Finance": "bg-gradient-to-r from-emerald-500 to-teal-600",
            "PSU": "bg-gradient-to-r from-violet-500 to-indigo-600",
            "Judiciary": "bg-gradient-to-r from-rose-500 to-pink-600",
            "Science": "bg-gradient-to-r from-blue-500 to-cyan-600",
            "Medical": "bg-gradient-to-r from-green-500 to-teal-600"
        }

        return colors[domain] || "bg-gradient-to-r from-gray-500 to-slate-600"
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
                <div className="h-64 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 animate-pulse"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 mb-6 animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-2/4 mb-6"></div>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24"></div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md w-full mb-4"></div>
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full mb-3"></div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 animate-pulse">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full mb-3"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!exam) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
                <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Exam Not Found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                    The exam you're looking for doesn't exist or might have been moved.
                </p>
                <Link href="/government-exams">
                    <Button>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Exams
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
            {/* Header */}
            <div className={`pt-10 pl-10 h-64 ${getDomainColor(exam.domain)}`}>
                <div className="inset-0 bg-black/20 dark:bg-black/40"></div>


                <Link href="/government-exams">
                    <Button variant="outline" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Exams
                    </Button>
                </Link>


                <div className="flex items-center">
                    <div className="max-w-4xl mx-auto animate-fade-in flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{exam.examName}</h1>
                        <Badge variant="outline" className="mb-2 bg-white/20 text-white backdrop-blur-sm">
                            {exam.domain}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                <Card className="border-0 shadow-xl dark:shadow-2xl mb-8 animate-fade-in-up">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold">{exam.conductingBody}</h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {exam.posts.length > 1
                                        ? `${exam.posts.length} Available Positions`
                                        : exam.posts[0]}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="px-3 py-1">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    {exam.examFrequency}
                                </Badge>
                                <a href={`https://${exam.website}`} target="_blank" rel="noopener noreferrer">
                                    <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                                        <Globe className="h-3.5 w-3.5 mr-1" />
                                        <span className="underline">{exam.website}</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Badge>
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                    Exam Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">Description</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        The {exam.examName} is conducted by {exam.conductingBody} for recruitment to various positions
                                        including {exam.posts.slice(0, 3).join(", ")}
                                        {exam.posts.length > 3 ? ` and ${exam.posts.length - 3} more` : ""}.
                                        This is a prestigious examination in the {exam.domain} sector and is held {exam.examFrequency.toLowerCase()}.
                                    </p>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-medium mb-3">Selection Process</h3>
                                    <div className="relative">
                                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-indigo-100 dark:bg-indigo-900/30"></div>
                                        {exam.selectionProcess.split("->").map((step, index) => (
                                            <div key={index} className="ml-8 mb-4 relative animate-fade-in" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                                                </div>
                                                <div className="font-medium">{`Stage ${index + 1}`}</div>
                                                <div className="text-gray-700 dark:text-gray-300">{step.trim()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-medium mb-3">Available Positions</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {exam.posts.map((post, index) => (
                                            <div key={index} className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:translate-x-1">
                                                <Briefcase className="h-4 w-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{post}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                    Preparation Resources
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Card className="border dark:border-gray-800 transition-all duration-300 hover:shadow-md">
                                        <CardContent className="p-4">
                                            <div className="font-medium">Recommended Books</div>
                                            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                <li>• Standard preparation guides</li>
                                                <li>• Previous year question papers</li>
                                                <li>• Subject-specific reference books</li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="border dark:border-gray-800 transition-all duration-300 hover:shadow-md">
                                        <CardContent className="p-4">
                                            <div className="font-medium">Online Resources</div>
                                            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                <li>• Official website: {exam.website}</li>
                                                <li>• Mock tests and practice papers</li>
                                                <li>• Video lectures and tutorials</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                    Syllabus Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    The syllabus for {exam.examName} typically covers the following areas:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                    {[
                                        "General Knowledge & Current Affairs",
                                        "Reasoning & Analytical Ability",
                                        "Quantitative Aptitude",
                                        "English Language",
                                        "Domain-specific Knowledge",
                                        "Computer Literacy (if applicable)",
                                        "General Awareness",
                                        "Professional Knowledge (if applicable)"
                                    ].map((topic, idx) => (
                                        <div key={idx} className="flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                                            <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-indigo-100 dark:bg-indigo-900/40 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Detailed Syllabus</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                For a detailed syllabus and exam pattern, please visit the official website:
                                                <a
                                                    href={`https://${exam.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                                                >
                                                    {exam.website}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                    Eligibility
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Education</div>
                                    <div className="flex items-start gap-2">
                                        <GraduationCap className="h-4 w-4 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-gray-800 dark:text-gray-200">{exam.eligibility.education}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Age Limit</div>
                                    <div className="flex items-start gap-2">
                                        <Users className="h-4 w-4 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-gray-800 dark:text-gray-200">{exam.eligibility.ageLimit}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                    Important Dates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 items-center text-sm">
                                    <div className="text-indigo-500 dark:text-indigo-400 font-medium">Frequency:</div>
                                    <div>{exam.examFrequency}</div>

                                    <div className="text-indigo-500 dark:text-indigo-400 font-medium">Notifications:</div>
                                    <div>Check official website for latest dates</div>

                                    <div className="text-indigo-500 dark:text-indigo-400 font-medium">Application:</div>
                                    <div>Usually 3-4 weeks from notification</div>

                                    <div className="text-indigo-500 dark:text-indigo-400 font-medium">Exam Date:</div>
                                    <div>2-3 months after notification</div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">For accurate dates:</span>
                                    <a
                                        href={`https://${exam.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                                    >
                                        Visit Official Site
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-0 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                            <CardContent className="p-5">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 mx-auto mb-3">
                                    <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-center font-medium mb-2">Need Help Preparing?</h3>
                                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Connect with mentors who have successfully cleared this exam
                                </p>
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Find a Mentor
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: `How often is the ${exam.examName} conducted?`,
                                answer: `The ${exam.examName} is typically conducted ${exam.examFrequency.toLowerCase()}.`
                            },
                            {
                                question: `What is the selection process for ${exam.examName}?`,
                                answer: `The selection process includes ${exam.selectionProcess}`
                            },
                            {
                                question: "How should I prepare for this exam?",
                                answer: "Focus on understanding the exam pattern, practicing previous years' questions, and covering the entire syllabus systematically. Regular revision and mock tests are essential for success."
                            },
                            {
                                question: "Is there any negative marking in the exam?",
                                answer: "Most government exams have negative marking for incorrect answers. Please check the latest exam notification for specific details."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3 -mx-3 rounded-lg">
                                <h3 className="font-medium mb-2">{faq.question}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}