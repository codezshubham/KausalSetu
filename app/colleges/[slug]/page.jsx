"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { use } from 'react'
import {
    ChevronLeft,
    MapPin,
    Mail,
    Globe,
    School,
    Users,
    GraduationCap,
    Calendar,
    Building,
    Info,
    BookOpen,
    Star,
    Phone
} from "lucide-react"
import { jammuCollegeData, kashmirCollegeData } from "@/data/collegeData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function CollegeDetailPage({ params }) {
    const unwrappedParams = use(params);
    const [college, setCollege] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Find college by slug
    useEffect(() => {
        setIsLoading(true)

        const slug = unwrappedParams.slug
        const decodedSlug = decodeURIComponent(slug)

        // Try to find in Jammu data
        let foundCollege = jammuCollegeData.find(c =>
            c.collegeName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase() === decodedSlug
        )

        // If not found, try Kashmir data
        if (!foundCollege) {
            foundCollege = kashmirCollegeData.find(c =>
                c.collegeName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase() === decodedSlug
            )
        }

        setTimeout(() => {
            setCollege(foundCollege || null)
            setIsLoading(false)
        }, 800)
    }, [unwrappedParams.slug])

    // Helper function to format course names
    const formatCourseName = (course) => {
        if (!course) return ''

        // For courses in parentheses
        if (course.includes('(') && course.includes(')')) {
            return course
        }

        // Check common degree patterns
        if (
            course.match(/^B\.\s?[A-Za-z]+\.?$/) ||
            course.match(/^M\.\s?[A-Za-z]+\.?$/) ||
            course.match(/^B[A-Z]+$/) ||
            course.match(/^M[A-Z]+$/)
        ) {
            return course
        }

        // Format full degree names
        if (course.toLowerCase().startsWith('bachelor')) {
            return course
        }

        if (course.toLowerCase().startsWith('master')) {
            return course
        }

        // Default - assume it's a subject name
        return course
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-16">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 animate-pulse"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8 animate-pulse">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                            <div className="flex-1">
                                <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md mb-2"></div>
                                <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md h-10 w-full mb-6 animate-pulse"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                        <div className="space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="h-60 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!college) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4">
                <GraduationCap className="h-16 w-16 text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2">College Not Found</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                    The college you're looking for doesn't exist or might have been moved.
                </p>
                <Link href="/colleges">
                    <Button>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to College Directory
                    </Button>
                </Link>
            </div>
        )
    }

    // Determine if Jammu or Kashmir college
    const division = jammuCollegeData.some(c => c.collegeName === college.collegeName)
        ? "Jammu"
        : "Kashmir"

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-16">
            {/* Header */}
            <div className="pt-10 pl-5 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 h-48">
                <Link href="/colleges" className="">
                    <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Directory
                    </Button>
                </Link>
            </div>

            {/* College Info Card */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
                <Card className="mb-8 shadow-lg border-0 animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold">{college.collegeName}</h1>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>{college.district}, {division} Division</span>
                                    </div>

                                    {(college.Rating || college.rating) && (
                                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                            <Star className="h-3.5 w-3.5 mr-1 fill-yellow-500 text-yellow-500" />
                                            {college.Rating || college.rating}
                                        </Badge>
                                    )}

                                    {college.gender && (
                                        <Badge variant="outline">
                                            {college.gender.charAt(0).toUpperCase() + college.gender.slice(1).toLowerCase()}
                                        </Badge>
                                    )}

                                    {college.instituteType && (
                                        <Badge variant="outline" className="hidden sm:flex">
                                            {college.instituteType.charAt(0).toUpperCase() + college.instituteType.slice(1).toLowerCase()}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full animate-in fade-in slide-in-from-bottom-5 duration-500 delay-150">
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-6">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {(college.studentCount > 0 || college.StudentCount > 0) && (
                                        <Card className="bg-gray-50 dark:bg-gray-900/60">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                    <Users className="h-4 w-4" />
                                                    <span>Students</span>
                                                </div>
                                                <div className="text-lg font-medium mt-1">
                                                    {college.studentCount?.toLocaleString() || college.StudentCount?.toLocaleString() || "N/A"}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {(college.facultyCount > 0 || college.FacultyCount > 0) && (
                                        <Card className="bg-gray-50 dark:bg-gray-900/60">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                    <Users className="h-4 w-4" />
                                                    <span>Faculty</span>
                                                </div>
                                                <div className="text-lg font-medium mt-1">
                                                    {college.facultyCount || college.FacultyCount || "N/A"}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {(college.campusSize || college.CampusSize) && (
                                        <Card className="bg-gray-50 dark:bg-gray-900/60">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                    <Building className="h-4 w-4" />
                                                    <span>Campus Size</span>
                                                </div>
                                                <div className="text-lg font-medium mt-1">
                                                    {college.campusSize || college.CampusSize}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                {/* About */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            About the College
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {college.description ||
                                                `${college.collegeName} is a ${(college.instituteType || "government college").toLowerCase()} 
                      located in ${college.district}, ${division} Division of Jammu & Kashmir. 
                      The college offers various undergraduate and postgraduate
                      courses to students and is committed to providing quality education.`}
                                        </p>

                                        {college.address && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                    Full Address
                                                </h3>
                                                <p className="text-gray-700 dark:text-gray-300">{college.address}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Accreditation & Status */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            Institution Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-600 dark:text-gray-400">Institution Type</div>
                                            <div className="font-medium">
                                                {college.instituteType ?
                                                    college.instituteType.charAt(0).toUpperCase() + college.instituteType.slice(1).toLowerCase() :
                                                    "Government Institution"
                                                }
                                            </div>
                                        </div>
                                        <Separator />

                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-600 dark:text-gray-400">Admission Gender</div>
                                            <div className="font-medium">
                                                {college.gender ?
                                                    college.gender === "female" || college.gender === "FEMALE" ? "Women Only" :
                                                        college.gender === "co-ed" || college.gender === "CO-ED" || college.gender === "Co-ed" ? "Co-Educational" :
                                                            college.gender :
                                                    "Co-Educational"
                                                }
                                            </div>
                                        </div>
                                        <Separator />

                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-600 dark:text-gray-400">Division</div>
                                            <div className="font-medium">{division} Division</div>
                                        </div>
                                        <Separator />

                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-600 dark:text-gray-400">District</div>
                                            <div className="font-medium">{college.district}</div>
                                        </div>
                                        <Separator />

                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-600 dark:text-gray-400">Degree Level</div>
                                            <div className="font-medium">
                                                {college.degreeType || college.DegreeType ?
                                                    college.degreeType || college.DegreeType :
                                                    "Undergraduate"
                                                }
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Contact Card */}
                                <Card className="overflow-hidden border-t-4 border-t-blue-500 dark:border-t-blue-600">
                                    <CardHeader className="bg-gray-50 dark:bg-gray-900/60 pb-3">
                                        <CardTitle className="text-lg">Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-4">
                                        {college.emailId && (
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                    <Mail className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Email</div>
                                                    <a
                                                        href={`mailto:${college.emailId}`}
                                                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline break-all"
                                                    >
                                                        {college.emailId}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {college.website && (
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                                    <Globe className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Website</div>
                                                    <a
                                                        href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline break-all"
                                                    >
                                                        {college.website.replace(/^https?:\/\//, '')}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {college.phone && (
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                                    <Phone className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                                                    <a
                                                        href={`tel:${college.phone}`}
                                                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        {college.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {!(college.emailId || college.website || college.phone) && (
                                            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                                <Mail className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                                <p>Contact information not available</p>
                                            </div>
                                        )}

                                        {college.emailId && (
                                            <Button className="w-full mt-2" variant="outline">
                                                <Mail className="h-4 w-4 mr-2" />
                                                Contact College
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Quick Links */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">Key Highlights</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 p-4">
                                        {college.coursesOffered && college.coursesOffered.length > 0 && (
                                            <div className="flex justify-between">
                                                <div className="text-gray-600 dark:text-gray-400">Available Courses</div>
                                                <div className="font-medium">{college.coursesOffered.length}</div>
                                            </div>
                                        )}

                                        {(college.Rating || college.rating) && (
                                            <div className="flex justify-between">
                                                <div className="text-gray-600 dark:text-gray-400">College Rating</div>
                                                <div className="font-medium flex items-center">
                                                    <Star className="h-3.5 w-3.5 mr-1 fill-yellow-500 text-yellow-500" />
                                                    {college.Rating || college.rating}
                                                </div>
                                            </div>
                                        )}

                                        {(college.studentCount > 0 || college.StudentCount > 0) && (college.facultyCount > 0 || college.FacultyCount > 0) && (
                                            <div className="flex justify-between">
                                                <div className="text-gray-600 dark:text-gray-400">Student-Faculty Ratio</div>
                                                <div className="font-medium">
                                                    {Math.round((college.studentCount || college.StudentCount) / (college.facultyCount || college.FacultyCount))}:1
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="courses" className="mt-0">
                        <Card className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    Available Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {(college.coursesOffered && college.coursesOffered.length > 0) ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {college.coursesOffered.map((course, index) => (
                                            <Card key={index} className="bg-gray-50 dark:bg-gray-900/60 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                                                            <GraduationCap className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{formatCourseName(course)}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {course.includes("B.") || course.includes("BA") || course.includes("BSc") || course.includes("B.Sc") || course.includes("BCA") || course.includes("B.Com") || course.includes("BBA") ? "Undergraduate" :
                                                                    course.includes("M.") || course.includes("MA") || course.includes("MSc") || course.includes("M.Sc") || course.includes("MCA") || course.includes("M.Com") || course.includes("MBA") ? "Postgraduate" :
                                                                        "Certificate/Diploma"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                        <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p className="text-lg mb-1">No course information available</p>
                                        <p className="text-sm">Please contact the college directly for current course offerings</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="contact" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        Contact Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {college.address && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Address</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{college.address}</div>
                                            </div>
                                        </div>
                                    )}

                                    {college.emailId && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Address</div>
                                                <a
                                                    href={`mailto:${college.emailId}`}
                                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all mt-1 inline-block"
                                                >
                                                    {college.emailId}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {college.website && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                                <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Website</div>
                                                <a
                                                    href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all mt-1 inline-block"
                                                >
                                                    {college.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {college.phone && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                                <Phone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Phone Number</div>
                                                <a
                                                    href={`tel:${college.phone}`}
                                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                                                >
                                                    {college.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {!(college.address || college.emailId || college.website || college.phone) && (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <Info className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                            <p className="text-lg mb-1">Contact information not available</p>
                                            <p className="text-sm">Please check the college's official website for contact details</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="h-fit">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        About The College
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {college.description ||
                                            `${college.collegeName} is a ${(college.instituteType || "government college").toLowerCase()} 
                    located in ${college.district}, ${division} Division of Jammu & Kashmir. 
                    The college is dedicated to providing quality education and fostering academic excellence.`}
                                    </p>

                                    {college.emailId && (
                                        <Button className="mt-4">
                                            <Mail className="h-4 w-4 mr-2" />
                                            Contact College
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}