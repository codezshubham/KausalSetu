"use client"

import { useState, useEffect } from "react"
import {
    Calendar,
    Clock,
    Bell,
    CheckCircle,
    AlertTriangle,
    Plus,
    Filter,
    Search,
    BookOpen,
    GraduationCap,
    FileText,
    Award,
    Building,
    Users,
    Target,
    ArrowRight,
    ExternalLink
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Timeline data
const timelineEvents = [
    {
        id: 1,
        title: "JEE Main 2024 Registration Opens",
        description: "Online application process begins for JEE Main examination",
        date: "2024-09-01",
        deadline: "2024-09-30",
        category: "Entrance Exam",
        type: "registration",
        priority: "high",
        status: "upcoming",
        institution: "NTA",
        eligibility: "12th Science students",
        fee: "₹650",
        link: "https://jeemain.nta.nic.in",
        tags: ["Engineering", "IIT", "NIT"]
    },
    {
        id: 2,
        title: "NEET 2024 Result Declaration",
        description: "National Eligibility cum Entrance Test results will be announced",
        date: "2024-09-15",
        deadline: "2024-09-15",
        category: "Result",
        type: "result",
        priority: "high",
        status: "upcoming",
        institution: "NTA",
        eligibility: "12th Biology students",
        fee: "Free",
        link: "https://neet.nta.nic.in",
        tags: ["Medical", "MBBS", "BDS"]
    },
    {
        id: 3,
        title: "DU Admission 2024 - Second Cut-off",
        description: "Delhi University announces second cut-off list for undergraduate admissions",
        date: "2024-09-10",
        deadline: "2024-09-12",
        category: "Admission",
        type: "cutoff",
        priority: "medium",
        status: "active",
        institution: "Delhi University",
        eligibility: "12th pass students",
        fee: "₹250",
        link: "https://du.ac.in",
        tags: ["Arts", "Science", "Commerce"]
    },
    {
        id: 4,
        title: "CAT 2024 Registration",
        description: "Common Admission Test registration for MBA programs",
        date: "2024-09-05",
        deadline: "2024-10-15",
        category: "Entrance Exam",
        type: "registration",
        priority: "medium",
        status: "active",
        institution: "IIMs",
        eligibility: "Graduates",
        fee: "₹2,300",
        link: "https://iimcat.ac.in",
        tags: ["MBA", "Management", "Business"]
    },
    {
        id: 5,
        title: "CLAT 2024 Application",
        description: "Common Law Admission Test for law colleges across India",
        date: "2024-08-20",
        deadline: "2024-10-31",
        category: "Entrance Exam",
        type: "registration",
        priority: "low",
        status: "active",
        institution: "Consortium of NLUs",
        eligibility: "12th pass students",
        fee: "₹4,000",
        link: "https://consortiumofnlus.ac.in",
        tags: ["Law", "Legal Studies"]
    },
    {
        id: 6,
        title: "GATE 2025 Registration",
        description: "Graduate Aptitude Test in Engineering registration opens",
        date: "2024-08-30",
        deadline: "2024-10-15",
        category: "Entrance Exam",
        type: "registration",
        priority: "medium",
        status: "active",
        institution: "IIT",
        eligibility: "Engineering graduates",
        fee: "₹1,850",
        link: "https://gate.iisc.ac.in",
        tags: ["Engineering", "M.Tech", "PSU"]
    },
    {
        id: 7,
        title: "State Board 12th Results",
        description: "Various state boards will declare Class 12 results",
        date: "2024-09-20",
        deadline: "2024-09-20",
        category: "Result",
        type: "result",
        priority: "high",
        status: "upcoming",
        institution: "State Boards",
        eligibility: "12th students",
        fee: "Free",
        link: "#",
        tags: ["Board Results", "12th Class"]
    },
    {
        id: 8,
        title: "Scholarship Application Deadline",
        description: "Last date for applying to central government scholarships",
        date: "2024-10-05",
        deadline: "2024-10-05",
        category: "Scholarship",
        type: "deadline",
        priority: "high",
        status: "upcoming",
        institution: "Government of India",
        eligibility: "Merit-based students",
        fee: "Free",
        link: "https://scholarships.gov.in",
        tags: ["Scholarship", "Financial Aid"]
    }
]

const categories = ["All Categories", "Entrance Exam", "Admission", "Result", "Scholarship", "Deadline"]
const priorities = ["All Priorities", "high", "medium", "low"]
const statuses = ["All Status", "upcoming", "active", "completed", "missed"]

export default function TimelinePage() {
    const [events, setEvents] = useState(timelineEvents)
    const [selectedCategory, setSelectedCategory] = useState("All Categories")
    const [selectedPriority, setSelectedPriority] = useState("All Priorities")
    const [selectedStatus, setSelectedStatus] = useState("All Status")
    const [searchTerm, setSearchTerm] = useState("")
    const [reminders, setReminders] = useState([])

    // Filter events
    useEffect(() => {
        let filteredEvents = timelineEvents.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory
            const matchesPriority = selectedPriority === "All Priorities" || event.priority === selectedPriority
            const matchesStatus = selectedStatus === "All Status" || event.status === selectedStatus

            return matchesSearch && matchesCategory && matchesPriority && matchesStatus
        })

        // Sort by date
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
        setEvents(filteredEvents)
    }, [searchTerm, selectedCategory, selectedPriority, selectedStatus])

    const getDaysUntil = (date) => {
        const today = new Date()
        const eventDate = new Date(date)
        const diffTime = eventDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high": return "text-red-600 bg-red-100 dark:bg-red-900/30"
            case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
            case "low": return "text-green-600 bg-green-100 dark:bg-green-900/30"
            default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "upcoming": return <Clock className="h-4 w-4 text-blue-600" />
            case "active": return <AlertTriangle className="h-4 w-4 text-orange-600" />
            case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />
            case "missed": return <Clock className="h-4 w-4 text-red-600" />
            default: return <Clock className="h-4 w-4 text-gray-600" />
        }
    }

    const getCategoryIcon = (category) => {
        switch (category) {
            case "Entrance Exam": return <Target className="h-5 w-5 text-blue-600" />
            case "Admission": return <GraduationCap className="h-5 w-5 text-purple-600" />
            case "Result": return <Award className="h-5 w-5 text-green-600" />
            case "Scholarship": return <FileText className="h-5 w-5 text-orange-600" />
            default: return <Calendar className="h-5 w-5 text-gray-600" />
        }
    }

    const addReminder = (eventId) => {
        if (!reminders.includes(eventId)) {
            setReminders([...reminders, eventId])
        }
    }

    const EventCard = ({ event }) => {
        const daysUntil = getDaysUntil(event.date)
        const isUrgent = daysUntil <= 7 && daysUntil >= 0

        return (
            <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm ${isUrgent ? 'ring-2 ring-orange-500/50' : ''}`}>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                                {getCategoryIcon(event.category)}
                                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                                    {event.title}
                                </CardTitle>
                            </div>
                            <CardDescription className="line-clamp-2">
                                {event.description}
                            </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Badge className={getPriorityColor(event.priority)}>
                                {event.priority}
                            </Badge>
                            {isUrgent && (
                                <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 animate-pulse">
                                    Urgent
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {getStatusIcon(event.status)}
                            <span className="text-sm font-medium capitalize">{event.status}</span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-semibold">
                                {daysUntil >= 0 ? `${daysUntil} days left` : `${Math.abs(daysUntil)} days ago`}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {new Date(event.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-xs text-muted-foreground">Institution</div>
                            <div className="font-medium">{event.institution}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Fee</div>
                            <div className="font-medium text-green-600">{event.fee}</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-xs text-muted-foreground">Eligibility</div>
                            <div className="font-medium">{event.eligibility}</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground mb-2">Tags:</div>
                        <div className="flex flex-wrap gap-1">
                            {event.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addReminder(event.id)}
                            className="flex-1"
                            disabled={reminders.includes(event.id)}
                        >
                            <Bell className="h-4 w-4 mr-1" />
                            {reminders.includes(event.id) ? "Reminder Set" : "Set Reminder"}
                        </Button>
                        <Button size="sm" className="flex-1">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Apply Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const UpcomingEvents = () => {
        const upcomingEvents = events
            .filter(event => getDaysUntil(event.date) >= 0 && getDaysUntil(event.date) <= 30)
            .sort((a, b) => getDaysUntil(a.date) - getDaysUntil(b.date))
            .slice(0, 5)

        return (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-blue-600" />
                        Upcoming Events (Next 30 Days)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                            <div className="flex-1">
                                <div className="font-medium text-sm line-clamp-1">{event.title}</div>
                                <div className="text-xs text-muted-foreground">{event.institution}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold text-blue-600">
                                    {getDaysUntil(event.date)} days
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    {upcomingEvents.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">
                            No upcoming events in the next 30 days
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    const StatsOverview = () => {
        const totalEvents = events.length
        const upcomingCount = events.filter(e => getDaysUntil(e.date) >= 0).length
        const urgentCount = events.filter(e => getDaysUntil(e.date) >= 0 && getDaysUntil(e.date) <= 7).length
        const remindersCount = reminders.length

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="text-center p-4">
                    <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{totalEvents}</div>
                    <div className="text-xs text-muted-foreground">Total Events</div>
                </Card>
                <Card className="text-center p-4">
                    <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{upcomingCount}</div>
                    <div className="text-xs text-muted-foreground">Upcoming</div>
                </Card>
                <Card className="text-center p-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">{urgentCount}</div>
                    <div className="text-xs text-muted-foreground">Urgent</div>
                </Card>
                <Card className="text-center p-4">
                    <Bell className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{remindersCount}</div>
                    <div className="text-xs text-muted-foreground">Reminders</div>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Academic Timeline Tracker
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with important dates for admissions, entrance exams, results, and scholarship deadlines.
                        Never miss a crucial academic opportunity.
                    </p>
                </div>

                {/* Stats Overview */}
                <StatsOverview />

                {/* Search and Filters */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search events, exams, admissions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
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

                            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorities.map(priority => (
                                        <SelectItem key={priority} value={priority}>
                                            {priority === "All Priorities" ? priority : priority.charAt(0).toUpperCase() + priority.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map(status => (
                                        <SelectItem key={status} value={status}>
                                            {status === "All Status" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Upcoming Events */}
                    <div className="lg:col-span-1">
                        <UpcomingEvents />
                    </div>

                    {/* Main Content - Event Timeline */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Timeline Events ({events.length})
                                </h2>
                                <p className="text-muted-foreground">
                                    Important academic dates and deadlines
                                </p>
                            </div>
                        </div>

                        {/* Events Grid */}
                        <div className="space-y-6">
                            {events.map((event, index) => (
                                <div key={event.id} className="relative">
                                    {/* Timeline Line */}
                                    {index !== events.length - 1 && (
                                        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                                    )}

                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                                    {/* Event Card */}
                                    <div className="ml-12">
                                        <EventCard event={event} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {events.length === 0 && (
                            <div className="text-center py-12">
                                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your search criteria or filters
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}