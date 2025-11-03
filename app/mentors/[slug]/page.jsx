"use client"

import { use } from 'react'
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    ChevronLeft,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Star,
    Users,
    Clock,
    MessageSquare,
    ThumbsUp,
    BarChart,
    FileText,
    BookOpen,
    Award,
    Bookmark,
    Share2,
    ExternalLink
} from "lucide-react"
import { mentorsData } from "@/data/mentorsData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function MentorDetailPage({ params }) {
    const unwrappedParams = use(params)
    const [mentor, setMentor] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("about")

    // Generate slug from name
    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
    }

    // Find mentor by slug
    useEffect(() => {
        setIsLoading(true)

        const slug = unwrappedParams.slug

        // Find mentor with matching slug
        const foundMentor = mentorsData.find(
            m => generateSlug(m.name) === slug
        )

        setTimeout(() => {
            setMentor(foundMentor || null)
            setIsLoading(false)
        }, 800)
    }, [unwrappedParams.slug])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
                <div className="h-64 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8 animate-pulse">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="w-32 h-32 rounded-xl bg-gray-200 dark:bg-gray-800"></div>
                            <div className="flex-1 space-y-4">
                                <div className="h-7 w-48 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                                <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                                <div className="flex gap-2">
                                    <div className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                    <div className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-pulse space-y-6">
                        <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                            </div>
                            <div>
                                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!mentor) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
                <Users className="h-16 w-16 text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Mentor Not Found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                    The mentor you're looking for doesn't exist or might have been moved.
                </p>
                <Link href="/mentors">
                    <Button>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Mentors Directory
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-16">
            {/* Header Banner */}
            <div className="pt-10 pl-5 h-64 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900">
                <Link href="/mentors">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Mentors
                    </Button>
                </Link>
            </div>

            {/* Mentor Profile Header Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
                <Card className="shadow-lg border-0 animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            {/* Profile Image */}
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border-4 border-white dark:border-gray-900 shadow-md">
                                {mentor.imageUrl ? (
                                    <Image
                                        src={mentor.imageUrl}
                                        alt={mentor.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Users className="h-16 w-16 text-purple-300 dark:text-purple-700" />
                                    </div>
                                )}
                            </div>

                            {/* Mentor Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold">{mentor.name}</h1>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg">{mentor.specialization}</p>
                                    </div>

                                    <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                                        <span className="font-medium text-yellow-800 dark:text-yellow-300">{mentor.rating}</span>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">({mentor.reviewCount} reviews)</span>
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 dark:text-gray-400">
                                    {mentor.currentRole && (
                                        <div className="flex items-center">
                                            <Briefcase className="h-4 w-4 mr-1.5" />
                                            {mentor.currentRole}
                                        </div>
                                    )}

                                    <div className="flex items-center">
                                        <GraduationCap className="h-4 w-4 mr-1.5" />
                                        {mentor.domain} Expert
                                    </div>

                                    {mentor.location && (
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1.5" />
                                            {mentor.location}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                                        {mentor.domain}
                                    </Badge>

                                    {mentor.areasOfExpertise.slice(0, 3).map((area, idx) => (
                                        <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            {area}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button>
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Schedule a Session
                                    </Button>

                                    <Button variant="outline">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Message
                                    </Button>

                                    <Button variant="ghost" size="icon">
                                        <Bookmark className="h-4 w-4" />
                                    </Button>

                                    <Button variant="ghost" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mentor Content Tabs */}
                <Tabs
                    defaultValue="about"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="mt-8 animate-in fade-in slide-in-from-bottom-5 duration-500 delay-150"
                >
                    <TabsList className="mb-6 bg-white dark:bg-gray-900">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="expertise">Expertise</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="sessions">Sessions</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <TabsContent value="about" className="m-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About {mentor.name}</CardTitle>
                                        <CardDescription>Background and professional information</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                            {mentor.about}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                            <div>
                                                <h3 className="text-lg font-medium flex items-center">
                                                    <Briefcase className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                                    Work Experience
                                                </h3>
                                                <ul className="mt-3 space-y-4">
                                                    {mentor.experience_details.map((exp, idx) => (
                                                        <li key={idx} className="relative pl-6 before:absolute before:left-0 before:top-[9px] before:h-2 before:w-2 before:rounded-full before:bg-purple-600 dark:before:bg-purple-400">
                                                            <div className="font-medium">{exp.role}</div>
                                                            <div className="text-gray-600 dark:text-gray-400 text-sm">{exp.company}</div>
                                                            <div className="text-gray-500 dark:text-gray-500 text-sm mt-0.5">{exp.period}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-medium flex items-center">
                                                    <ThumbsUp className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                                    What I Can Help You With
                                                </h3>
                                                <ul className="mt-3 space-y-2">
                                                    {mentor.helpAreas.map((area, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <div className="h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <ChevronLeft className="h-3 w-3 rotate-[-135deg]" />
                                                            </div>
                                                            <span className="ml-2">{area}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="expertise" className="m-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Areas of Expertise</CardTitle>
                                        <CardDescription>Specialized knowledge and career guidance</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {mentor.areasOfExpertise.map((area, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                                                        <ChevronLeft className="h-4 w-4 rotate-[-135deg]" />
                                                    </div>
                                                    <span className="ml-2">{area}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <BarChart className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                                Skills and Competencies
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                                {mentor.skills.map((skill, idx) => (
                                                    <div key={idx} className="space-y-1.5">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm font-medium">{skill.name}</span>
                                                            <span className="text-sm text-gray-500">{skill.level}/5</span>
                                                        </div>
                                                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                                                                style={{ width: `${(skill.level / 5) * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <FileText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                                Industry Insights
                                            </h3>

                                            <Accordion type="single" collapsible className="w-full">
                                                {mentor.industryInsights.map((insight, idx) => (
                                                    <AccordionItem key={idx} value={`insight-${idx}`}>
                                                        <AccordionTrigger>{insight.title}</AccordionTrigger>
                                                        <AccordionContent>
                                                            <p className="text-gray-700 dark:text-gray-300">
                                                                {insight.content}
                                                            </p>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="education" className="m-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Education & Certifications</CardTitle>
                                        <CardDescription>Academic background and professional qualifications</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <GraduationCap className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                                Education
                                            </h3>

                                            <ul className="space-y-6">
                                                {mentor.education.map((edu, idx) => (
                                                    <li key={idx} className="flex gap-4">
                                                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                                            <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{edu.degree}</div>
                                                            <div className="text-purple-600 dark:text-purple-400">{edu.institution}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <Award className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                                                Certifications
                                            </h3>

                                            <ul className="space-y-4">
                                                {mentor.certifications.map((cert, idx) => (
                                                    <li key={idx} className="flex gap-4">
                                                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                                                            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{cert.name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer} • {cert.year}</div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="sessions" className="m-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Mentoring Sessions</CardTitle>
                                        <CardDescription>Available session formats and topics</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {mentor.sessionTypes.map((session, idx) => (
                                                <Card key={idx} className="bg-white dark:bg-gray-900 hover:shadow-md transition-shadow border dark:border-gray-800">
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                                                {session.type === "1-on-1" ? (
                                                                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                                ) : session.type === "Group" ? (
                                                                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                                ) : (
                                                                    <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                                )}
                                                            </div>

                                                            <div>
                                                                <div className="font-medium">{session.name}</div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">{session.type} • {session.duration}</div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                                                            {session.description}
                                                        </div>

                                                        <div className="mt-3 flex items-center justify-between">
                                                            <div className="font-semibold">{session.price}</div>
                                                            <Button size="sm">Book Session</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>

                                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-start">
                                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 mr-4">
                                                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Flexible scheduling</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                    All sessions can be scheduled at your convenience. Mentors typically respond within 24 hours to session requests.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="reviews" className="m-0">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Student Reviews</CardTitle>
                                            <CardDescription>Feedback from previous mentees</CardDescription>
                                        </div>
                                        <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
                                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                                            <span className="font-medium text-yellow-800 dark:text-yellow-300">{mentor.rating}</span>
                                            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">({mentor.reviewCount})</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {mentor.reviews.map((review, idx) => (
                                            <div key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0 last:pb-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                            {review.avatar ? (
                                                                <Image
                                                                    src={review.avatar}
                                                                    alt={review.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <Users className="h-5 w-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{review.name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{review.date}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating
                                                                        ? "text-yellow-500 fill-yellow-500"
                                                                        : "text-gray-300 dark:text-gray-600"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="mt-3 text-gray-700 dark:text-gray-300">{review.comment}</p>
                                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {review.sessionType} • {review.topic}
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Session Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>Availability</span>
                                        </div>
                                        <div>{mentor.availability}</div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>Response Time</span>
                                        </div>
                                        <div>{mentor.responseTime}</div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <Users className="h-4 w-4 mr-2" />
                                            <span>Mentored Students</span>
                                        </div>
                                        <div>{mentor.menteeCount}+</div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            <span>Languages</span>
                                        </div>
                                        <div>{mentor.languages.join(", ")}</div>
                                    </div>

                                    <Button className="w-full mt-2">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Book a Session
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Resources Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Career Resources</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {mentor.resources.map((resource, idx) => (
                                        <a
                                            key={idx}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                        >
                                            <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="font-medium text-sm group-hover:text-blue-600">{resource.title}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{resource.type}</div>
                                            </div>
                                            <ExternalLink className="h-3.5 w-3.5 text-gray-400 ml-auto" />
                                        </a>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Domain Specialties */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Domain Expertise</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {mentor.domainSpecialties.map((specialty, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="text-gray-700 dark:text-gray-300">{specialty.name}</div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1.5 w-4 rounded-full mx-0.5 ${i < specialty.level
                                                                    ? "bg-purple-600 dark:bg-purple-500"
                                                                    : "bg-gray-200 dark:bg-gray-700"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}