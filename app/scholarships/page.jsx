"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { scholarshipsData } from "@/data/scholarshipData"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, X, ChevronRight, Book, Building, Calendar, GraduationCap, Banknote } from "lucide-react"

export default function ScholarshipsPage() {
    // Extract unique domains and levels for filtering
    const allDomains = [...new Set(scholarshipsData.map(scholarship => scholarship.domain))]
    const allLevels = [...new Set(scholarshipsData.map(scholarship => scholarship.level))]

    // State for filters and search
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDomains, setSelectedDomains] = useState([])
    const [selectedLevels, setSelectedLevels] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [filteredScholarships, setFilteredScholarships] = useState(scholarshipsData)

    // Filter scholarships based on search and filters
    useEffect(() => {
        let result = scholarshipsData

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(scholarship =>
                scholarship.name.toLowerCase().includes(query) ||
                scholarship.provider.toLowerCase().includes(query)
            )
        }

        if (selectedDomains.length > 0) {
            result = result.filter(scholarship => selectedDomains.includes(scholarship.domain))
        }

        if (selectedLevels.length > 0) {
            result = result.filter(scholarship => selectedLevels.includes(scholarship.level))
        }

        setFilteredScholarships(result)
    }, [searchQuery, selectedDomains, selectedLevels])

    // Toggle domain selection
    const toggleDomain = (domain) => {
        setSelectedDomains(prev =>
            prev.includes(domain)
                ? prev.filter(d => d !== domain)
                : [...prev, domain]
        )
    }

    // Toggle level selection
    const toggleLevel = (level) => {
        setSelectedLevels(prev =>
            prev.includes(level)
                ? prev.filter(l => l !== level)
                : [...prev, level]
        )
    }

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("")
        setSelectedDomains([])
        setSelectedLevels([])
    }

    // Generate slug for routing
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white animate-fade-in">
                            Scholarship Explorer
                        </h1>
                        <p className="mt-4 text-lg text-purple-100 animate-fade-in animation-delay-150">
                            Find and apply for scholarships across various domains to support your educational journey
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
                                    placeholder="Search scholarships by name or provider..."
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
                                    <Badge className="ml-2 bg-purple-500 text-white">
                                        {selectedDomains.length + selectedLevels.length}
                                    </Badge>
                                </Button>
                                {(selectedDomains.length > 0 || selectedLevels.length > 0 || searchQuery) && (
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

                                {/* Domain filters */}
                                <div className="mb-4">
                                    <h3 className="font-medium mb-3 text-sm">Filter by Domain</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allDomains.map((domain) => (
                                            <Badge
                                                key={domain}
                                                variant={selectedDomains.includes(domain) ? "default" : "outline"}
                                                className={`cursor-pointer py-1.5 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ${selectedDomains.includes(domain)
                                                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                                                    : "bg-transparent"
                                                    }`}
                                                onClick={() => toggleDomain(domain)}
                                            >
                                                {domain}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Level filters */}
                                <div>
                                    <h3 className="font-medium mb-3 text-sm">Filter by Education Level</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allLevels.map((level) => (
                                            <Badge
                                                key={level}
                                                variant={selectedLevels.includes(level) ? "default" : "outline"}
                                                className={`cursor-pointer py-1.5 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ${selectedLevels.includes(level)
                                                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                                                    : "bg-transparent"
                                                    }`}
                                                onClick={() => toggleLevel(level)}
                                            >
                                                {level}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Scholarships listing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                        {filteredScholarships.length} Scholarship{filteredScholarships.length !== 1 && 's'} Found
                    </h2>
                </div>

                {filteredScholarships.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="flex justify-center">
                            <Book className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No scholarships found</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        <Button onClick={clearFilters} className="mt-4">
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredScholarships.map((scholarship, index) => (
                            <Link
                                href={`/scholarships/${scholarship.id}-${generateSlug(scholarship.name)}`}
                                key={scholarship.id}
                                className="group"
                            >
                                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden border dark:border-gray-800 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className={`h-2 ${scholarship.domain === "All Streams"
                                        ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                                        : scholarship.domain.includes("Engineering")
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                            : scholarship.domain.includes("Science")
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                                : scholarship.domain.includes("Medical")
                                                    ? "bg-gradient-to-r from-red-500 to-rose-500"
                                                    : "bg-gradient-to-r from-amber-500 to-orange-500"
                                        }`} />
                                    <CardContent className="p-5">
                                        <div className="flex flex-col gap-2 items-start">
                                            <h3 className="font-semibold text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {scholarship.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{scholarship.provider}</p>
                                            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800 text-xs whitespace-nowrap">
                                                {scholarship.level}
                                            </Badge>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <GraduationCap className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <span className="line-clamp-1">{scholarship.domain}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Banknote className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <span className="line-clamp-1">{scholarship.stipend}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                                                <span className="line-clamp-1">Apply: {scholarship.enrollmentMonth}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {scholarship.region}
                                            </div>
                                            <div className="flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform duration-200">
                                                View Details
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </div>
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