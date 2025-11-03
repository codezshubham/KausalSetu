"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { 
  Search, 
  MapPin, 
  Building, 
  ChevronRight, 
  GraduationCap,
  X,
  ArrowUpDown
} from "lucide-react"
import { jammuCollegeData, kashmirCollegeData } from "@/data/collegeData"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("jammu")
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Process colleges with districts
  const jammuColleges = useMemo(() => {
    const districts = [...new Set(jammuCollegeData.map(college => college.district))].sort()
    
    const collegesByDistrict = districts.map(district => ({
      district,
      colleges: jammuCollegeData
        .filter(college => college.district === district)
        .sort((a, b) => {
          if (sortBy === "name") {
            return sortDirection === "asc" 
              ? a.collegeName.localeCompare(b.collegeName)
              : b.collegeName.localeCompare(a.collegeName)
          } else if (sortBy === "rating") {
            const ratingA = parseFloat(a.Rating) || 0
            const ratingB = parseFloat(b.Rating) || 0
            return sortDirection === "asc" ? ratingA - ratingB : ratingB - ratingA
          }
          return 0
        })
    }))
    
    return collegesByDistrict
  }, [jammuCollegeData, sortBy, sortDirection])

  const kashmirColleges = useMemo(() => {
    const districts = [...new Set(kashmirCollegeData.map(college => college.district))].sort()
    
    const collegesByDistrict = districts.map(district => ({
      district,
      colleges: kashmirCollegeData
        .filter(college => college.district === district)
        .sort((a, b) => {
          if (sortBy === "name") {
            return sortDirection === "asc" 
              ? a.collegeName.localeCompare(b.collegeName)
              : b.collegeName.localeCompare(a.collegeName)
          } else if (sortBy === "rating") {
            const ratingA = parseFloat(a.rating) || 0
            const ratingB = parseFloat(b.rating) || 0
            return sortDirection === "asc" ? ratingA - ratingB : ratingB - ratingA
          }
          return 0
        })
    }))
    
    return collegesByDistrict
  }, [kashmirCollegeData, sortBy, sortDirection])

  // Filter colleges based on search
  const filteredJammuColleges = useMemo(() => {
    if (!searchTerm) return jammuColleges

    return jammuColleges.map(districtData => ({
      ...districtData,
      colleges: districtData.colleges.filter(college => 
        college.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (college.address && college.address.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(districtData => districtData.colleges.length > 0)
  }, [jammuColleges, searchTerm])

  const filteredKashmirColleges = useMemo(() => {
    if (!searchTerm) return kashmirColleges

    return kashmirColleges.map(districtData => ({
      ...districtData,
      colleges: districtData.colleges.filter(college => 
        college.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (college.address && college.address.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(districtData => districtData.colleges.length > 0)
  }, [kashmirColleges, searchTerm])

  // Toggle sort direction
  const toggleSort = (type) => {
    if (sortBy === type) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(type)
      setSortDirection("asc")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-900 dark:to-indigo-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Explore Colleges in Jammu & Kashmir
          </h1>
          <p className="mt-3 text-blue-100 text-lg">
            Browse our comprehensive directory of colleges across all districts
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search colleges by name or location..."
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
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleSort("name")}
                className="flex items-center gap-1"
              >
                Name 
                <ArrowUpDown className={`h-3.5 w-3.5 ${sortBy === "name" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleSort("rating")}
                className="flex items-center gap-1"
              >
                Rating
                <ArrowUpDown className={`h-3.5 w-3.5 ${sortBy === "rating" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Tabs 
          defaultValue="jammu" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="jammu"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-800"
            >
              Jammu Division
            </TabsTrigger>
            <TabsTrigger 
              value="kashmir"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-800"
            >
              Kashmir Division
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jammu" className="mt-0">
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJammuColleges.length > 0 ? (
              <div className="space-y-8">
                {filteredJammuColleges.map(({ district, colleges }) => (
                  <div key={district} className="animate-in fade-in duration-500">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      {district} District
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {colleges.length} Colleges
                      </Badge>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {colleges.map((college) => (
                        <Link 
                          href={`/colleges/${encodeURIComponent(college.collegeName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase())}`}
                          key={college.collegeName}
                        >
                          <Card className="p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-200 flex items-center justify-between group">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="h-5 w-5" />
                              </div>
                              
                              <div>
                                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {college.collegeName}
                                </h3>
                                
                                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  <span className="truncate">
                                    {college.address ? 
                                      (college.address.length > 40 ? college.address.substring(0, 40) + '...' : college.address) : 
                                      `${college.district}, J&K`
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              {college.Rating && (
                                <Badge variant="outline" className="mr-2 hidden sm:flex">
                                  {college.Rating}/5
                                </Badge>
                              )}
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No colleges found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try adjusting your search to find what you're looking for.
                </p>
                <Button onClick={() => setSearchTerm("")} className="mt-4">
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="kashmir" className="mt-0">
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredKashmirColleges.length > 0 ? (
              <div className="space-y-8">
                {filteredKashmirColleges.map(({ district, colleges }) => (
                  <div key={district} className="animate-in fade-in duration-500">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      {district} District
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {colleges.length} Colleges
                      </Badge>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {colleges.map((college) => (
                        <Link 
                          href={`/colleges/${encodeURIComponent(college.collegeName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase())}`}
                          key={college.collegeName}
                        >
                          <Card className="p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-200 flex items-center justify-between group">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                                <GraduationCap className="h-5 w-5" />
                              </div>
                              
                              <div>
                                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {college.collegeName}
                                </h3>
                                
                                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  <span className="truncate">
                                    {college.address ? 
                                      (college.address.length > 40 ? college.address.substring(0, 40) + '...' : college.address) : 
                                      `${college.district}, J&K`
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              {college.rating && (
                                <Badge variant="outline" className="mr-2 hidden sm:flex">
                                  {college.rating}
                                </Badge>
                              )}
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No colleges found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try adjusting your search to find what you're looking for.
                </p>
                <Button onClick={() => setSearchTerm("")} className="mt-4">
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}