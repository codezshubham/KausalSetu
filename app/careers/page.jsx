"use client"

import { useState, useEffect } from "react"
import {
    Search,
    Filter,
    TrendingUp,
    Users,
    IndianRupee,
    Clock,
    Star,
    ChevronRight,
    BookOpen,
    Award,
    Target,
    Briefcase,
    GraduationCap,
    ArrowRight,
    Building,
    MapPin,
    Calendar
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Career path data
const careerData = {
    "Science": [
        {
            id: 1,
            title: "Software Engineer",
            category: "Technology",
            description: "Design and develop software applications and systems",
            courses: ["Computer Science", "Information Technology", "Software Engineering"],
            salaryRange: "₹4L - ₹25L",
            avgSalary: "₹8.5L",
            jobGrowth: 85,
            skillsRequired: ["Programming", "Problem Solving", "Data Structures", "Algorithms"],
            topCompanies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
            education: "B.Tech/B.E in CS/IT",
            experience: "0-2 years",
            jobOpenings: 15420,
            difficulty: "Medium",
            timeToLearn: "2-3 years",
            tags: ["High Demand", "Remote Work", "Innovation"]
        },
        {
            id: 2,
            title: "Data Scientist",
            category: "Analytics",
            description: "Analyze complex data to help organizations make better decisions",
            courses: ["Mathematics", "Statistics", "Computer Science", "Data Science"],
            salaryRange: "₹6L - ₹30L",
            avgSalary: "₹12L",
            jobGrowth: 92,
            skillsRequired: ["Python/R", "Machine Learning", "Statistics", "SQL"],
            topCompanies: ["IBM", "Flipkart", "Uber", "Netflix", "LinkedIn"],
            education: "B.Tech/M.Tech in CS/Stats",
            experience: "1-3 years",
            jobOpenings: 8750,
            difficulty: "Hard",
            timeToLearn: "3-4 years",
            tags: ["High Growth", "AI/ML", "Future Tech"]
        },
        {
            id: 3,
            title: "Doctor (MBBS)",
            category: "Healthcare",
            description: "Diagnose and treat patients, save lives and improve health outcomes",
            courses: ["Biology", "Chemistry", "Physics", "MBBS"],
            salaryRange: "₹5L - ₹50L",
            avgSalary: "₹15L",
            jobGrowth: 78,
            skillsRequired: ["Medical Knowledge", "Communication", "Empathy", "Problem Solving"],
            topCompanies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Government Hospitals"],
            education: "MBBS + Specialization",
            experience: "5+ years",
            jobOpenings: 12500,
            difficulty: "Very Hard",
            timeToLearn: "5-8 years",
            tags: ["Noble Profession", "Job Security", "Social Impact"]
        },
        {
            id: 4,
            title: "Mechanical Engineer",
            category: "Engineering",
            description: "Design, develop and manufacture mechanical systems and products",
            courses: ["Mathematics", "Physics", "Mechanical Engineering"],
            salaryRange: "₹3L - ₹20L",
            avgSalary: "₹6L",
            jobGrowth: 68,
            skillsRequired: ["CAD Software", "Thermodynamics", "Materials Science", "Manufacturing"],
            topCompanies: ["Tata Motors", "Mahindra", "L&T", "Bajaj", "Hero MotoCorp"],
            education: "B.Tech in Mechanical",
            experience: "0-2 years",
            jobOpenings: 9800,
            difficulty: "Medium",
            timeToLearn: "4 years",
            tags: ["Manufacturing", "Automotive", "Core Engineering"]
        }
    ],
    "Commerce": [
        {
            id: 5,
            title: "Chartered Accountant",
            category: "Finance",
            description: "Manage financial records, tax planning, and business advisory",
            courses: ["Accountancy", "Business Studies", "Economics"],
            salaryRange: "₹6L - ₹40L",
            avgSalary: "₹18L",
            jobGrowth: 75,
            skillsRequired: ["Accounting", "Taxation", "Auditing", "Financial Analysis"],
            topCompanies: ["Big 4 Firms", "Banks", "Corporations", "Practice Firms"],
            education: "CA Qualification",
            experience: "3-5 years",
            jobOpenings: 6500,
            difficulty: "Hard",
            timeToLearn: "4-5 years",
            tags: ["High Salary", "Prestigious", "Business Advisory"]
        },
        {
            id: 6,
            title: "Investment Banker",
            category: "Finance",
            description: "Help companies raise capital and provide financial advisory services",
            courses: ["Economics", "Finance", "Business Studies"],
            salaryRange: "₹8L - ₹60L",
            avgSalary: "₹25L",
            jobGrowth: 82,
            skillsRequired: ["Financial Modeling", "Valuation", "Communication", "Analytical Skills"],
            topCompanies: ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "ICICI", "HDFC"],
            education: "MBA/CFA",
            experience: "2-4 years",
            jobOpenings: 3200,
            difficulty: "Very Hard",
            timeToLearn: "5-6 years",
            tags: ["High Salary", "Global Exposure", "Fast Paced"]
        },
        {
            id: 7,
            title: "Digital Marketing Manager",
            category: "Marketing",
            description: "Plan and execute digital marketing strategies to promote brands",
            courses: ["Business Studies", "Economics", "Communication"],
            salaryRange: "₹3L - ₹18L",
            avgSalary: "₹7L",
            jobGrowth: 88,
            skillsRequired: ["SEO/SEM", "Social Media", "Content Marketing", "Analytics"],
            topCompanies: ["Google", "Facebook", "Amazon", "Flipkart", "Agencies"],
            education: "Any Graduate + Certification",
            experience: "1-3 years",
            jobOpenings: 11200,
            difficulty: "Medium",
            timeToLearn: "1-2 years",
            tags: ["Creative", "Growth Field", "Flexible"]
        }
    ],
    "Arts": [
        {
            id: 8,
            title: "Civil Services Officer (IAS/IPS)",
            category: "Government",
            description: "Serve the nation through administrative and policy-making roles",
            courses: ["Political Science", "History", "Geography", "Any Graduate"],
            salaryRange: "₹7L - ₹25L",
            avgSalary: "₹12L",
            jobGrowth: 65,
            skillsRequired: ["Leadership", "Communication", "General Knowledge", "Problem Solving"],
            topCompanies: ["Central Government", "State Governments", "Public Sector"],
            education: "Any Graduate + UPSC",
            experience: "Entry Level",
            jobOpenings: 2500,
            difficulty: "Very Hard",
            timeToLearn: "2-3 years prep",
            tags: ["Prestigious", "Job Security", "Social Impact"]
        },
        {
            id: 9,
            title: "Psychologist",
            category: "Healthcare",
            description: "Study human behavior and provide mental health support",
            courses: ["Psychology", "Sociology", "Philosophy"],
            salaryRange: "₹3L - ₹15L",
            avgSalary: "₹6L",
            jobGrowth: 78,
            skillsRequired: ["Counseling", "Research", "Communication", "Empathy"],
            topCompanies: ["Hospitals", "Clinics", "Schools", "NGOs", "Private Practice"],
            education: "M.A./M.Sc in Psychology",
            experience: "1-2 years",
            jobOpenings: 4800,
            difficulty: "Medium",
            timeToLearn: "3-4 years",
            tags: ["Mental Health", "Social Impact", "Growing Field"]
        },
        {
            id: 10,
            title: "Content Writer",
            category: "Media",
            description: "Create engaging content for websites, blogs, and marketing materials",
            courses: ["English", "Journalism", "Communication", "Any Graduate"],
            salaryRange: "₹2L - ₹12L",
            avgSalary: "₹4.5L",
            jobGrowth: 85,
            skillsRequired: ["Writing", "Research", "SEO", "Creativity"],
            topCompanies: ["Media Houses", "Digital Agencies", "Tech Companies", "Freelance"],
            education: "Any Graduate",
            experience: "0-2 years",
            jobOpenings: 8900,
            difficulty: "Easy",
            timeToLearn: "6 months - 1 year",
            tags: ["Creative", "Remote Work", "Flexible"]
        }
    ]
}

const streams = ["All Streams", "Science", "Commerce", "Arts"]
const categories = ["All Categories", "Technology", "Healthcare", "Finance", "Engineering", "Government", "Marketing", "Media", "Analytics"]
const difficulties = ["All Levels", "Easy", "Medium", "Hard", "Very Hard"]

export default function CareerPathPage() {
    const [selectedStream, setSelectedStream] = useState("All Streams")
    const [selectedCategory, setSelectedCategory] = useState("All Categories")
    const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredCareers, setFilteredCareers] = useState([])

    useEffect(() => {
        let allCareers = []

        // Collect all careers from selected stream or all streams
        if (selectedStream === "All Streams") {
            Object.values(careerData).forEach(streamCareers => {
                allCareers = [...allCareers, ...streamCareers]
            })
        } else {
            allCareers = careerData[selectedStream] || []
        }

        // Apply filters
        let filtered = allCareers.filter(career => {
            const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                career.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "All Categories" || career.category === selectedCategory
            const matchesDifficulty = selectedDifficulty === "All Levels" || career.difficulty === selectedDifficulty

            return matchesSearch && matchesCategory && matchesDifficulty
        })

        setFilteredCareers(filtered)
    }, [selectedStream, selectedCategory, selectedDifficulty, searchTerm])

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy": return "text-green-600 bg-green-100 dark:bg-green-900/30"
            case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
            case "Hard": return "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
            case "Very Hard": return "text-red-600 bg-red-100 dark:bg-red-900/30"
            default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
        }
    }

    const CareerCard = ({ career }) => (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <CardTitle className="group-hover:text-primary transition-colors">
                            {career.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {career.category}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(career.difficulty)}`}>
                                {career.difficulty}
                            </Badge>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-primary">{career.avgSalary}</div>
                        <div className="text-xs text-muted-foreground">Average Salary</div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {career.description}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Job Growth</span>
                        <span className="text-sm text-green-600">{career.jobGrowth}%</span>
                    </div>
                    <Progress value={career.jobGrowth} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-green-600" />
                        <span>{career.salaryRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                        <span>{career.jobOpenings} jobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>{career.timeToLearn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-purple-600" />
                        <span>{career.experience}</span>
                    </div>
                </div>

                <div>
                    <div className="text-xs text-muted-foreground mb-2">Required Education:</div>
                    <div className="text-sm font-medium">{career.education}</div>
                </div>

                <div>
                    <div className="text-xs text-muted-foreground mb-2">Key Skills:</div>
                    <div className="flex flex-wrap gap-1">
                        {career.skillsRequired.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                        {career.skillsRequired.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{career.skillsRequired.length - 3} more
                            </Badge>
                        )}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-muted-foreground mb-2">Top Employers:</div>
                    <div className="text-sm">
                        {career.topCompanies.slice(0, 2).join(", ")}
                        {career.topCompanies.length > 2 && "..."}
                    </div>
                </div>

                <div className="flex gap-1 flex-wrap">
                    {career.tags.map((tag, index) => (
                        <Badge key={index} className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <div className="p-6 pt-0">
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explore Career Path
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </Card>
    )

    const StreamOverview = ({ stream }) => {
        const streamCareers = careerData[stream] || []
        const avgSalary = streamCareers.reduce((sum, career) => sum + parseFloat(career.avgSalary.replace(/[₹L]/g, '')), 0) / streamCareers.length
        const avgGrowth = streamCareers.reduce((sum, career) => sum + career.jobGrowth, 0) / streamCareers.length
        const totalJobs = streamCareers.reduce((sum, career) => sum + career.jobOpenings, 0)

        return (
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple/5 border border-primary/20">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary">{stream} Stream</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">₹{avgSalary.toFixed(1)}L</div>
                            <div className="text-sm text-muted-foreground">Avg Salary</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{avgGrowth.toFixed(0)}%</div>
                            <div className="text-sm text-muted-foreground">Job Growth</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{totalJobs.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Job Openings</div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Career Path Explorer
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover your ideal career path based on your academic stream. Explore opportunities, salary expectations, and growth prospects in various fields.
                    </p>
                </div>

                {/* Stream Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {Object.keys(careerData).map(stream => (
                        <StreamOverview key={stream} stream={stream} />
                    ))}
                </div>

                {/* Search and Filters */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search careers by title or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Select value={selectedStream} onValueChange={setSelectedStream}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {streams.map(stream => (
                                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {difficulties.map(difficulty => (
                                        <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Found {filteredCareers.length} career paths
                    </h2>
                    <p className="text-muted-foreground">
                        Explore diverse career opportunities across different streams
                    </p>
                </div>

                {/* Career Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCareers.map(career => (
                        <CareerCard key={career.id} career={career} />
                    ))}
                </div>

                {/* No Results */}
                {filteredCareers.length === 0 && (
                    <div className="text-center py-12">
                        <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No career paths found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search criteria or filters
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}