"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Heart,
    Search,
    X,
    ChevronRight,
    Sparkles,
    BookOpen,
    ArrowRight,
    Check,
    Filter,
    PlusCircle,
    LightbulbIcon
} from "lucide-react"
import { passionData } from "@/data/passionData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

export default function PassionPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [filteredCategories, setFilteredCategories] = useState(passionData)
    const [expandedCategory, setExpandedCategory] = useState(null)
    const [showSelectedOnly, setShowSelectedOnly] = useState(false)

    // Update filtered categories when search changes
    useEffect(() => {
        if (!searchQuery.trim() && !showSelectedOnly) {
            setFilteredCategories(passionData)
            return
        }

        const query = searchQuery.toLowerCase()
        let filtered = passionData

        // Apply search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(category =>
                category.title.toLowerCase().includes(query) ||
                category.options.some(option => option.toLowerCase().includes(query))
            )
        }

        // Apply selected-only filter
        if (showSelectedOnly) {
            const selectedCategoryIds = selectedOptions.map(option => {
                const categoryId = passionData.find(cat =>
                    cat.options.includes(option)
                )?.id
                return categoryId
            })

            filtered = filtered.filter(category =>
                selectedCategoryIds.includes(category.id)
            )
        }

        setFilteredCategories(filtered)
    }, [searchQuery, showSelectedOnly, selectedOptions])

    // Toggle category selection
    const toggleCategory = (categoryId) => {
        if (expandedCategory === categoryId) {
            setExpandedCategory(null)
        } else {
            setExpandedCategory(categoryId)
        }
    }

    // Toggle option selection
    const toggleOption = (option) => {
        setSelectedOptions(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        )
    }

    // Clear search
    const clearSearch = () => {
        setSearchQuery("")
    }

    // Clear all selections
    const clearSelections = () => {
        setSelectedOptions([])
    }

    // Submit selections
    const submitSelections = () => {
        if (selectedOptions.length === 0) {
            // Show some validation message
            return
        }

        // Here you would typically save the selections to your database
        // and then redirect to the results or dashboard

        // For now, let's just simulate a redirect
        console.log("Selected passions:", selectedOptions)
        router.push("/aptitude")
    }

    // Get count of options in a category that are selected
    const getSelectedCountForCategory = (categoryId) => {
        const category = passionData.find(c => c.id === categoryId)
        if (!category) return 0

        return category.options.filter(option =>
            selectedOptions.includes(option)
        ).length
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-12">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-3xl animate-fade-in">
                        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="h-8 w-8 text-yellow-300" />
                            Discover Your Passion
                        </h1>
                        <p className="mt-4 text-lg text-indigo-100 animate-fade-in animation-delay-150">
                            Explore different interest areas to get personalized career guidance that aligns with what you love
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
                <Card className="shadow-lg border-0 dark:bg-gray-900 overflow-hidden animate-fade-in-up">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search interests or categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={showSelectedOnly ? "secondary" : "outline"}
                                    onClick={() => setShowSelectedOnly(!showSelectedOnly)}
                                    className="w-full md:w-auto"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    {showSelectedOnly ? "Show All" : "Show Selected"}
                                    <Badge className="ml-2 bg-purple-500 text-white">
                                        {selectedOptions.length}
                                    </Badge>
                                </Button>
                                {selectedOptions.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        onClick={clearSelections}
                                        className="w-full md:w-auto"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear
                                    </Button>
                                )}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button className="w-full md:w-auto">
                                            <Heart className="h-4 w-4 mr-2" />
                                            Selected ({selectedOptions.length})
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="sm:max-w-md">
                                        <SheetHeader>
                                            <SheetTitle>Your Selected Passions</SheetTitle>
                                            <SheetDescription>
                                                You've selected {selectedOptions.length} interests that reflect your passions
                                            </SheetDescription>
                                        </SheetHeader>

                                        {selectedOptions.length > 0 ? (
                                            <ScrollArea className="h-[60vh] mt-6 pr-4">
                                                <div className="space-y-4">
                                                    {passionData.map(category => {
                                                        const selectedInCategory = category.options.filter(option =>
                                                            selectedOptions.includes(option)
                                                        )

                                                        if (selectedInCategory.length === 0) return null

                                                        return (
                                                            <div key={category.id} className="space-y-2">
                                                                <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">
                                                                    {category.title}
                                                                </h4>
                                                                <div className="space-y-1">
                                                                    {selectedInCategory.map(option => (
                                                                        <div
                                                                            key={option}
                                                                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-md"
                                                                        >
                                                                            <span className="text-sm">{option}</span>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() => toggleOption(option)}
                                                                                className="h-8 w-8 p-0"
                                                                            >
                                                                                <X className="h-4 w-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </ScrollArea>
                                        ) : (
                                            <div className="h-[40vh] flex flex-col items-center justify-center text-center p-4">
                                                <Heart className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
                                                <h3 className="text-lg font-medium mb-2">No passions selected yet</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                                                    Explore the categories and select interests that resonate with you to get personalized career guidance
                                                </p>
                                            </div>
                                        )}

                                        <SheetFooter className="mt-6">
                                            <SheetClose asChild>
                                                <Button variant="outline" className="w-full sm:w-auto">
                                                    Continue Exploring
                                                </Button>
                                            </SheetClose>
                                            <Button
                                                className="w-full sm:w-auto"
                                                disabled={selectedOptions.length === 0}
                                                onClick={submitSelections}
                                            >
                                                Get Career Guidance
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick selection guide */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 shadow-sm animate-fade-in-up animation-delay-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                <LightbulbIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-medium mb-1">How to use this tool</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Browse categories, select interests that resonate with you, and discover career paths aligned with your passions. The more specific your selections, the better our recommendations.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <Button variant="outline" className="bg-white/80 dark:bg-gray-900/50">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="flex justify-center">
                            <Search className="h-16 w-16 text-gray-300 dark:text-gray-700" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No matching interests found</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        <Button onClick={clearSearch} className="mt-4">
                            Clear search
                        </Button>
                    </div>
                ) : (
                    filteredCategories.map((category) => {
                        const isExpanded = expandedCategory === category.id
                        const hasSelectedOptions = category.options.some(option => selectedOptions.includes(option))
                        const selectedCount = getSelectedCountForCategory(category.id)

                        return (
                            <div
                                key={category.id}
                                className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm transition-all duration-300 ${isExpanded ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : 'hover:shadow-md'
                                    } ${hasSelectedOptions ? 'border-l-4 border-purple-500 dark:border-purple-400' : ''
                                    } animate-fade-in-up`}
                                style={{ animationDelay: `${(category.id % 10) * 50}ms` }}
                            >
                                <div
                                    className="p-5 cursor-pointer flex items-center justify-between"
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${hasSelectedOptions
                                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {hasSelectedOptions ? (
                                                <Check className="h-5 w-5" />
                                            ) : (
                                                <Heart className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">{category.title}</h3>
                                            {category.options.length > 0 && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {category.options.length} interests • {selectedCount} selected
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {hasSelectedOptions && (
                                            <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/50">
                                                {selectedCount} selected
                                            </Badge>
                                        )}
                                        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                                    </div>
                                </div>

                                {isExpanded && category.options.length > 0 && (
                                    <div className="px-5 pb-5">
                                        <Separator className="mb-4" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                            {category.options.map((option) => {
                                                const isSelected = selectedOptions.includes(option)
                                                return (
                                                    <div
                                                        key={option}
                                                        onClick={() => toggleOption(option)}
                                                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${isSelected
                                                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium'
                                                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700/50'
                                                            }`}
                                                    >
                                                        <span className="truncate">{option}</span>
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected
                                                                ? 'bg-purple-500 dark:bg-purple-400 text-white'
                                                                : 'border-2 border-gray-300 dark:border-gray-600'
                                                            }`}>
                                                            {isSelected && <Check className="h-3 w-3" />}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            {/* Fixed action button */}
            {selectedOptions.length > 0 && (
                <div className="fixed bottom-6 right-0 left-0 flex justify-center px-4 z-10 animate-fade-in">
                    <Button
                        size="lg"
                        className="shadow-lg"
                        onClick={submitSelections}
                    >
                        Get Career Guidance for {selectedOptions.length} Passion{selectedOptions.length !== 1 && 's'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    )
}