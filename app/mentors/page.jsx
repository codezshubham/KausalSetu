"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    Search,
    Filter,
    Briefcase,
    GraduationCap,
    Star,
    ChevronRight,
    Users,
    X,
    BadgeCheck
} from "lucide-react"
import { mentorsData } from "@/data/mentorsData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function MentorsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDomain, setSelectedDomain] = useState("all")
    const [isLoading, setIsLoading] = useState(true)
    const [mentors, setMentors] = useState([])

    // Extract unique domains from mentors data
    const domains = ["all", ...new Set(mentorsData.map(mentor => mentor.domain))]

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setMentors(mentorsData)
            setIsLoading(false)
        }, 800)
    }, [])

    // Filter mentors based on search term and selected domain
    const filteredMentors = mentors.filter(mentor => {
        const matchesSearch =
            searchTerm === "" ||
            mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.domain.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesDomain =
            selectedDomain === "all" ||
            mentor.domain === selectedDomain

        return matchesSearch && matchesDomain
    })

    // Generate URL-friendly slug from name
    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Find Your Career Mentor
                    </h1>
                    <p className="mt-3 text-purple-100 text-lg max-w-3xl">
                        Connect with experienced mentors and counsellors who can guide you through
                        your education and career journey
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Search by name, specialization, or domain..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    onClick={() => setSearchTerm("")}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="w-full md:w-64">
                            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                                <SelectTrigger className="w-full">
                                    <div className="flex items-center">
                                        <Filter className="h-4 w-4 mr-2 text-gray-400" />
                                        <SelectValue placeholder="Filter by domain" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {domains.map(domain => (
                                        <SelectItem key={domain} value={domain}>
                                            {domain === "all" ? "All Domains" : domain}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-[220px]"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredMentors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMentors.map((mentor) => (
                            <Link
                                key={mentor.id}
                                href={`/mentors/${generateSlug(mentor.name)}`}
                                className="block transition duration-200"
                            >
                                <Card className="h-full overflow-hidden hover:shadow-md hover:border-purple-300 dark:hover:border-purple-800 transition-all flex flex-col group animate-in fade-in slide-in-from-bottom-3 duration-500">
                                    <div className="relative pt-[56%] bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {mentor.imageUrl ? (
                                                <div className="relative w-full h-full">
                                                    {/* <Image
                                                        src={mentor.imageUrl}
                                                        alt={mentor.name}
                                                        fill
                                                        className="object-cover"
                                                    /> */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                                </div>
                                            ) : (
                                                <Users className="h-20 w-20 text-purple-300 dark:text-purple-800" />
                                            )}
                                        </div>

                                        <Badge className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-gray-900">
                                            {mentor.domain}
                                        </Badge>

                                        {mentor.featured && (
                                            <div className="absolute bottom-3 left-3">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded-full text-xs font-medium">
                                                                <BadgeCheck className="h-3 w-3 mr-1" />
                                                                Featured
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Top-rated mentor</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="flex-1 p-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {mentor.name}
                                            </h3>
                                            <div className="flex items-center text-yellow-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="ml-1 text-sm">{mentor.rating}</span>
                                            </div>
                                        </div>

                                        <div className="mt-1 flex items-center text-gray-600 dark:text-gray-400 text-sm">
                                            <Briefcase className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                            <span>{mentor.experience} Years Experience</span>
                                        </div>

                                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {mentor.specialization}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {mentor.areasOfExpertise.slice(0, 3).map((area, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                                >
                                                    {area}
                                                </Badge>
                                            ))}
                                            {mentor.areasOfExpertise.length > 3 && (
                                                <Badge variant="outline" className="dark:border-gray-700">
                                                    +{mentor.areasOfExpertise.length - 3} more
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform text-sm font-medium">
                                            View Profile
                                            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-900">
                        <GraduationCap className="h-16 w-16 mx-auto text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium">No mentors found</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            We couldn't find any mentors matching your search criteria. Try adjusting your filters or search term.
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                            <Button onClick={() => setSearchTerm("")}>
                                Clear Search
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setSelectedDomain("all")}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* Results Stats */}
                {!isLoading && filteredMentors.length > 0 && (
                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredMentors.length} mentors
                        {selectedDomain !== "all" && ` in ${selectedDomain}`}
                        {searchTerm && ` matching "${searchTerm}"`}
                    </div>
                )}
            </div>
        </div>
    )
}