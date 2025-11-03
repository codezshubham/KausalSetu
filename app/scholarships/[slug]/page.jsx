"use client"

import { use } from 'react'
import { useState, useEffect } from "react"
import Link from "next/link"
import { scholarshipsData } from "@/data/scholarshipData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    ChevronLeft,
    Calendar,
    GraduationCap,
    MapPin,
    FileText,
    Banknote,
    Building,
    CheckCircle,
    ExternalLink,
    Clock,
    Award
} from "lucide-react"

export default function ScholarshipDetailPage({ params }) {
    const unwrappedParams = use(params)
    const [scholarship, setScholarship] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const slug = unwrappedParams.slug
        const id = parseInt(slug.split('-')[0])
        const foundScholarship = scholarshipsData.find(s => s.id === id)

        setTimeout(() => {
            setScholarship(foundScholarship || null)
            setIsLoading(false)
        }, 300) // Simulate loading
    }, [unwrappedParams.slug])

    // Get domain-specific gradient
    const getDomainGradient = (domain) => {
        if (domain === "All Streams") return "from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900"
        if (domain.includes("Engineering")) return "from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-cyan-900"
        if (domain.includes("Science")) return "from-green-600 to-emerald-600 dark:from-green-900 dark:to-emerald-900"
        if (domain.includes("Medical")) return "from-red-600 to-rose-600 dark:from-red-900 dark:to-rose-900"
        return "from-amber-600 to-orange-600 dark:from-amber-900 dark:to-orange-900"
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
                <div className="h-64 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 animate-pulse"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
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

    if (!scholarship) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
                <FileText className="h-16 w-16 text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Scholarship Not Found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                    The scholarship you're looking for doesn't exist or might have been moved.
                </p>
                <Link href="/scholarships">
                    <Button>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Scholarships
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
            {/* Header */}
            <div className={`bg-gradient-to-r ${getDomainGradient(scholarship.domain)} h-64 pt-10 pl-10`}>
               


                <Link href="/scholarships">
                    <Button variant="outline" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Scholarships
                    </Button>
                </Link>


                <div className="flex items-center">
                    <div className="max-w-4xl mx-auto">
                        <Badge variant="outline" className="mb-2 bg-white/20 text-white backdrop-blur-sm">
                            {scholarship.domain}
                        </Badge>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-fade-in">
                            {scholarship.name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                <Card className="border-0 shadow-xl dark:shadow-2xl mb-8 animate-fade-in-up">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold">{scholarship.provider}</h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {scholarship.region}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="px-3 py-1 flex items-center">
                                    <GraduationCap className="h-3.5 w-3.5 mr-1" />
                                    {scholarship.level}
                                </Badge>

                                <Badge variant="outline" className="px-3 py-1 flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    {scholarship.enrollmentMonth}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        {/* Scholarship Overview */}
                        <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                    Scholarship Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-2">Description</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        The {scholarship.name} is provided by {scholarship.provider} for students in the {scholarship.domain} domain.
                                        This scholarship is available for students at the {scholarship.level} level.
                                    </p>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-medium mb-3">Eligibility Criteria</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">{scholarship.eligibility}</p>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-medium mb-3">Required Documents</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {scholarship.requirements.map((requirement, index) => (
                                            <div key={index} className="flex items-center gap-2 transition-all hover:translate-x-1 duration-200">
                                                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Process */}
                        <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                    Application Process
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                                        <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                                            Important Dates
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            Application window: <span className="font-medium">{scholarship.enrollmentMonth}</span>
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            It is recommended to prepare all required documents beforehand and apply early.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">General Application Steps</h4>
                                        <ol className="space-y-3 ml-4 list-decimal">
                                            <li className="text-gray-700 dark:text-gray-300 pl-1">
                                                Visit the official website of {scholarship.provider}
                                            </li>
                                            <li className="text-gray-700 dark:text-gray-300 pl-1">
                                                Register and create your profile with accurate information
                                            </li>
                                            <li className="text-gray-700 dark:text-gray-300 pl-1">
                                                Fill out the application form with all required details
                                            </li>
                                            <li className="text-gray-700 dark:text-gray-300 pl-1">
                                                Upload all necessary documents as specified in the requirements
                                            </li>
                                            <li className="text-gray-700 dark:text-gray-300 pl-1">
                                                Review your application carefully before final submission
                                            </li>
                                            <li className="text-gray-700 dark:text-gray-300 pl-1">
                                                Submit your application before the deadline
                                            </li>
                                        </ol>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/40 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                                                <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-blue-700 dark:text-blue-300">Official Website</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    For detailed information and to apply, please visit the official website.
                                                </p>
                                                <a
                                                    href={scholarship.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center mt-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                                >
                                                    Visit Application Portal
                                                    <ExternalLink className="h-3 w-3 ml-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips for Successful Application */}
                        <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                    Tips for Successful Application
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-medium">Start early:</span> Begin the application process well before the deadline.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-medium">Follow instructions carefully:</span> Read all requirements and follow them precisely.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-medium">Prepare documents:</span> Ensure all required documents are ready and meet specifications.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-medium">Be honest:</span> Provide accurate information in your application.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-medium">Double-check:</span> Review your application for errors before submitting.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {/* Scholarship Details */}
                        <Card className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                    Scholarship Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 items-center text-sm">
                                    <div className="text-purple-500 dark:text-purple-400">
                                        <Banknote className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs">Stipend</div>
                                        <div className="font-medium">{scholarship.stipend}</div>
                                    </div>

                                    <div className="text-purple-500 dark:text-purple-400">
                                        <GraduationCap className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs">Domain</div>
                                        <div className="font-medium">{scholarship.domain}</div>
                                    </div>

                                    <div className="text-purple-500 dark:text-purple-400">
                                        <Building className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs">Provider</div>
                                        <div className="font-medium">{scholarship.provider}</div>
                                    </div>

                                    <div className="text-purple-500 dark:text-purple-400">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs">Enrollment Period</div>
                                        <div className="font-medium">{scholarship.enrollmentMonth}</div>
                                    </div>

                                    <div className="text-purple-500 dark:text-purple-400">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs">Region</div>
                                        <div className="font-medium">{scholarship.region}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                    Provider Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">{scholarship.provider}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        For any queries related to this scholarship, please contact the provider through their official website.
                                    </p>
                                    <a
                                        href={scholarship.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline font-medium"
                                    >
                                        Visit Official Website
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Apply Now CTA */}
                        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-0 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                            <CardContent className="p-5">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/40 mx-auto mb-3">
                                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-center font-medium mb-2">Ready to Apply?</h3>
                                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Make sure you meet all the eligibility criteria and have all required documents ready.
                                </p>
                                <a
                                    href={scholarship.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                        Apply Now
                                        <ExternalLink className="h-3.5 w-3.5 ml-2" />
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Similar Scholarships</h2>
                        <Link href="/scholarships">
                            <Button variant="outline" className="text-sm">View All</Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {scholarshipsData
                            .filter(s =>
                                (s.domain === scholarship.domain || s.level === scholarship.level) &&
                                s.id !== scholarship.id
                            )
                            .slice(0, 3)
                            .map(relatedScholarship => (
                                <Link
                                    href={`/scholarships/${relatedScholarship.id}-${relatedScholarship.name
                                        .toLowerCase()
                                        .replace(/[^\w\s-]/g, '')
                                        .replace(/\s+/g, '-')}`}
                                    key={relatedScholarship.id}
                                    className="group"
                                >
                                    <Card className="hover:shadow-md transition-shadow border dark:border-gray-800">
                                        <CardContent className="p-4">
                                            <h3 className="font-medium text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-1">
                                                {relatedScholarship.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {relatedScholarship.provider}
                                            </p>
                                            <div className="flex flex-col items-start mt-3 gap-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {relatedScholarship.level}
                                                </Badge>
                                                <div className="pl-1 text-xs text-purple-600 dark:text-purple-400">
                                                    View Details
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}