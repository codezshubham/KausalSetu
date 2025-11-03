"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X, ChevronDown, ChevronRight, BookOpen, Building, Calendar, GraduationCap, Clock, Globe } from "lucide-react"
import Link from "next/link"
import { governmentExamsData } from "@/data/governmentExamsData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function GovernmentExamsPage() {
    // Extract unique domains from the data
    const allDomains = [...new Set(governmentExamsData.map(exam => exam.domain))]

    // State for filters and search
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDomains, setSelectedDomains] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [filteredExams, setFilteredExams] = useState(governmentExamsData)

    // Update filtered exams when filters change
    useEffect(() => {
        let result = governmentExamsData

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(exam =>
                exam.examName.toLowerCase().includes(query) ||
                exam.conductingBody.toLowerCase().includes(query)
            )
        }

        // Filter by selected domains
        if (selectedDomains.length > 0) {
            result = result.filter(exam => selectedDomains.includes(exam.domain))
        }

        setFilteredExams(result)
    }, [searchQuery, selectedDomains])

    // Toggle domain selection
    const toggleDomain = (domain) => {
        setSelectedDomains(prev =>
            prev.includes(domain)
                ? prev.filter(d => d !== domain)
                : [...prev, domain]
        )
    }

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("")
        setSelectedDomains([])
    }

    // Generate a slug for routing
    const generateSlug = (examName) => {
        return examName
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    // Get domain color
    const getDomainColor = (domain) => {
        const colors = {
            "Civil Services": "from-amber-500 to-orange-600",
            "Banking": "from-green-500 to-emerald-600",
            "Defence": "from-blue-500 to-indigo-600",
            "Police": "from-purple-500 to-violet-600",
            "Central Government": "from-red-500 to-rose-600",
            "Railways": "from-cyan-500 to-sky-600",
            "Engineering": "from-fuchsia-500 to-pink-600",
            "Teaching": "from-lime-500 to-green-600",
            "Intelligence": "from-slate-500 to-gray-600",
            "Insurance": "from-amber-500 to-yellow-600",
            "Finance": "from-emerald-500 to-teal-600",
            "PSU": "from-violet-500 to-indigo-600",
            "Judiciary": "from-rose-500 to-pink-600",
            "Science": "from-blue-500 to-cyan-600",
            "Medical": "from-green-500 to-teal-600"
        }

        return colors[domain] || "from-gray-500 to-slate-600"
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white animate-fade-in-down">
                            Government Exam Explorer
                        </h1>
                        <p className="mt-4 text-lg text-indigo-100 animate-fade-in-down animation-delay-150">
                            Discover and prepare for top government examinations across various domains
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <Card className="shadow-lg border-0 dark:bg-gray-900 overflow-hidden animate-fade-in-up">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search exams by name or conducting body..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={showFilters ? "secondary" : "outline"}
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="w-full md:w-auto"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                    <Badge className="ml-2 bg-indigo-500 text-white">{selectedDomains.length}</Badge>
                                </Button>
                                {(selectedDomains.length > 0 || searchQuery) && (
                                    <Button
                                        variant="ghost"
                                        onClick={clearFilters}
                                        className="w-full md:w-auto"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>

                        {showFilters && (
                            <div className="mt-6 transition-all duration-300 ease-in-out animate-fade-in">
                                <Separator className="mb-4" />
                                <h3 className="font-medium mb-3 text-sm">Filter by Domain</h3>
                                <div className="flex flex-wrap gap-2">
                                    {allDomains.map(domain => (
                                        <Badge
                                            key={domain}
                                            variant={selectedDomains.includes(domain) ? "default" : "outline"}
                                            className={cn(
                                                "cursor-pointer py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
                                                selectedDomains.includes(domain)
                                                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                                                    : "bg-transparent"
                                            )}
                                            onClick={() => toggleDomain(domain)}
                                        >
                                            {domain}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Exams listing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                        {filteredExams.length} Exam{filteredExams.length !== 1 && 's'} Found
                    </h2>
                </div>

                {filteredExams.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="flex justify-center">
                            <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No exams found</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        <Button onClick={clearFilters} className="mt-4">
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredExams.map((exam, index) => (
                            <Link
                                href={`/government-exams/${generateSlug(exam.examName)}`}
                                key={exam.id}
                                className="group animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden border dark:border-gray-800">
                                    <div className={`h-2 bg-gradient-to-r ${getDomainColor(exam.domain)}`} />
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {exam.examName}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exam.conductingBody}</p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="bg-gray-50 dark:bg-gray-800 text-xs"
                                            >
                                                {exam.domain}
                                            </Badge>
                                        </div>

                                        <div className="mt-4 space-y-1.5">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Building className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                                {exam.posts.length > 1 ? `${exam.posts.length} Posts` : exam.posts[0]}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                                {exam.examFrequency}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {exam.eligibility.education.length > 30
                                                    ? exam.eligibility.education.substring(0, 30) + '...'
                                                    : exam.eligibility.education}
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}