import Link from "next/link"
import { ArrowRight, Users, MapPin, BookOpen, Calendar, Star, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const features = [
    {
      icon: Target,
      title: "Aptitude Assessment",
      description: "Discover your strengths and interests through personalized quizzes and get course recommendations.",
      href: "/aptitude"
    },
    {
      icon: TrendingUp,
      title: "Career Path Mapping",
      description: "Explore detailed career journeys for each degree and understand future opportunities.",
      href: "/careers"
    },
    {
      icon: MapPin,
      title: "Government Colleges",
      description: "Find nearby government colleges with course details, cut-offs, and facilities.",
      href: "/colleges"
    },
    {
      icon: Calendar,
      title: "Timeline Tracker",
      description: "Never miss important admission dates, scholarship deadlines, or entrance exams.",
      href: "/timeline"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Students Guided" },
    { number: "500+", label: "Government Colleges" },
    { number: "100+", label: "Career Paths" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Smart India Hackathon 2025
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Your Path to
              <span className="text-primary block">Higher Education</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Make informed decisions about your academic future. Get personalized career guidance,
              discover government colleges, and unlock opportunities after Class 10 & 12.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/aptitude">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/colleges">
                  Explore Colleges
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Bridging the Career Guidance Gap
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Students face confusion about stream selection, career prospects, and the value of graduation.
              KaushalSetu provides clarity and direction for informed academic decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">The Problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Unclear stream selection after Class 10/12</p>
                <p>• Lack of awareness about government colleges</p>
                <p>• Unknown career prospects for different degrees</p>
                <p>• Poor perception of graduation value</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Personalized aptitude assessments</p>
                <p>• Comprehensive college directory</p>
                <p>• Clear career path mapping</p>
                <p>• Timeline tracking for admissions</p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-600">The Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Increased government college enrollment</p>
                <p>• Reduced dropout rates</p>
                <p>• Informed academic decisions</p>
                <p>• Empowered student community</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and information you need to make
              the right educational and career choices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href={feature.href}>
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Shape Your Future?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have made informed decisions about their academic journey.
            Start with our free aptitude assessment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/aptitude">
                Take Aptitude Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/colleges">
                Browse Colleges
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}