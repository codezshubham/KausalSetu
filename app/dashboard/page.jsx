"use client"

import { useState, useEffect } from "react"
import {
    Users,
    GraduationCap,
    TrendingUp,
    Eye,
    UserCheck,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    MapPin,
    BookOpen,
    Target,
    Clock,
    ChevronDown,
    Download,
    Filter
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - Replace with real API calls
const dashboardData = {
    overview: {
        totalUsers: 52847,
        totalColleges: 1248,
        activeUsers: 8432,
        siteVisitors: 15678,
        aptitudeTests: 12543,
        careerConsultations: 8965
    },
    userGrowth: [
        { month: 'Jan', users: 1200, tests: 800, consultations: 400 },
        { month: 'Feb', users: 1900, tests: 1200, consultations: 600 },
        { month: 'Mar', users: 2800, tests: 1800, consultations: 900 },
        { month: 'Apr', users: 3900, tests: 2500, consultations: 1200 },
        { month: 'May', users: 4900, tests: 3200, consultations: 1600 },
        { month: 'Jun', users: 6200, tests: 4100, consultations: 2100 }
    ],
    streamDistribution: [
        { stream: 'Science', percentage: 45, count: 23781 },
        { stream: 'Commerce', percentage: 35, count: 18496 },
        { stream: 'Arts', percentage: 20, count: 10569 }
    ],
    recentUsers: [
        { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', stream: 'Science', joinDate: '2024-08-30', status: 'active' },
        { id: 2, name: 'Priya Patel', email: 'priya@email.com', stream: 'Commerce', joinDate: '2024-08-30', status: 'active' },
        { id: 3, name: 'Amit Kumar', email: 'amit@email.com', stream: 'Arts', joinDate: '2024-08-29', status: 'pending' },
        { id: 4, name: 'Sneha Singh', email: 'sneha@email.com', stream: 'Science', joinDate: '2024-08-29', status: 'active' }
    ],
    topColleges: [
        { id: 1, name: 'IIT Delhi', applications: 2543, state: 'Delhi', type: 'Engineering' },
        { id: 2, name: 'DU - Miranda House', applications: 1876, state: 'Delhi', type: 'Arts & Science' },
        { id: 3, name: 'SRCC', applications: 1654, state: 'Delhi', type: 'Commerce' },
        { id: 4, name: 'IIT Bombay', applications: 1432, state: 'Maharashtra', type: 'Engineering' }
    ]
}

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState("7d")
    const [selectedStream, setSelectedStream] = useState("all")

    const StatCard = ({ title, value, change, icon: Icon, trend = "up" }) => (
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value.toLocaleString()}</div>
                {change && (
                    <p className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
                        {change}% from last period
                    </p>
                )}
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
    )

    const SimpleBarChart = ({ data, title }) => (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription>Growth trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={item.month} className="flex items-center gap-4">
                            <div className="w-8 text-sm font-medium">{item.month}</div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Users: {item.users}</span>
                                    <span>Tests: {item.tests}</span>
                                    <span>Consultations: {item.consultations}</span>
                                </div>
                                <div className="space-y-1">
                                    <Progress value={(item.users / 7000) * 100} className="h-2" />
                                    <Progress value={(item.tests / 5000) * 100} className="h-2" />
                                    <Progress value={(item.consultations / 2500) * 100} className="h-2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )

    const StreamPieChart = ({ data }) => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Stream Distribution
                </CardTitle>
                <CardDescription>Student preferences by academic stream</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={item.stream} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{item.stream}</span>
                                <Badge variant="secondary">{item.percentage}%</Badge>
                            </div>
                            <Progress value={item.percentage} className="h-3" />
                            <div className="text-xs text-muted-foreground">
                                {item.count.toLocaleString()} students
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Monitor KaushalSetu platform performance and user analytics
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                                <SelectItem value="30d">Last 30 days</SelectItem>
                                <SelectItem value="90d">Last 3 months</SelectItem>
                                <SelectItem value="1y">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Export
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <StatCard
                        title="Total Users"
                        value={dashboardData.overview.totalUsers}
                        change={12.5}
                        icon={Users}
                    />
                    <StatCard
                        title="Government Colleges"
                        value={dashboardData.overview.totalColleges}
                        change={8.2}
                        icon={GraduationCap}
                    />
                    <StatCard
                        title="Active Users (24h)"
                        value={dashboardData.overview.activeUsers}
                        change={5.7}
                        icon={UserCheck}
                    />
                    <StatCard
                        title="Site Visitors"
                        value={dashboardData.overview.siteVisitors}
                        change={15.3}
                        icon={Eye}
                    />
                    <StatCard
                        title="Aptitude Tests"
                        value={dashboardData.overview.aptitudeTests}
                        change={22.1}
                        icon={Target}
                    />
                    <StatCard
                        title="Career Consultations"
                        value={dashboardData.overview.careerConsultations}
                        change={18.9}
                        icon={BookOpen}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <SimpleBarChart
                        data={dashboardData.userGrowth}
                        title="Platform Growth Analytics"
                    />
                    <StreamPieChart data={dashboardData.streamDistribution} />
                </div>

                {/* Detailed Tables */}
                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="users" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Recent Users
                        </TabsTrigger>
                        <TabsTrigger value="colleges" className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Top Colleges
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Site Analytics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Recent User Registrations</CardTitle>
                                        <CardDescription>Latest students who joined the platform</CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dashboardData.recentUsers.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{user.name}</div>
                                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="outline">{user.stream}</Badge>
                                                <div className="text-sm text-muted-foreground">{user.joinDate}</div>
                                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                                    {user.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="colleges">
                        <Card>
                            <CardHeader>
                                <CardTitle>Most Applied Colleges</CardTitle>
                                <CardDescription>Government colleges with highest application rates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dashboardData.topColleges.map((college, index) => (
                                        <div key={college.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{college.name}</div>
                                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <MapPin className="h-3 w-3" />
                                                        {college.state}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="outline">{college.type}</Badge>
                                                <div className="text-right">
                                                    <div className="font-semibold">{college.applications}</div>
                                                    <div className="text-xs text-muted-foreground">applications</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        Peak Usage Hours
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM', '10:00 PM - 12:00 AM'].map((time, index) => (
                                            <div key={time} className="flex justify-between items-center">
                                                <span className="text-sm">{time}</span>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={[85, 72, 68, 45][index]} className="w-20 h-2" />
                                                    <span className="text-xs text-muted-foreground">{[85, 72, 68, 45][index]}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Top States by Users
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {['Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Rajasthan'].map((state, index) => (
                                            <div key={state} className="flex justify-between items-center">
                                                <span className="text-sm">{state}</span>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={[92, 78, 65, 54, 41][index]} className="w-20 h-2" />
                                                    <span className="text-xs text-muted-foreground">{[12543, 9876, 7654, 6543, 4321][index]}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}