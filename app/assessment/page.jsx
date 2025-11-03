// app/assessment/page.jsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Target, ChevronRight, Lightbulb } from "lucide-react"
import Image from "next/image"

export default function AssessmentPage() {
  const router = useRouter()
  const { token } = useAppSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  
  // Check authentication in useEffect
  useEffect(() => {
    if (!token?.user) {
      router.push("/login?callbackUrl=/assessment")
    } else {
      setIsLoading(false)
    }
  }, [token, router])
  
  const assessmentSections = [
    {
      id: 1,
      title: "Aptitude Assessment",
      description: "Discover your natural abilities and strengths",
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      color: "from-purple-500 to-blue-500",
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-900/20",
      href: "/assessment/aptitude"
    },
    {
      id: 2,
      title: "Interests Assessment",
      description: "Explore activities and subjects you enjoy most",
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      color: "from-pink-500 to-orange-500",
      bgLight: "bg-pink-50",
      bgDark: "dark:bg-pink-900/20",
      href: "/assessment/interests"
    },
    {
      id: 3,
      title: "Values Assessment",
      description: "Understand what matters most to you in your career",
      icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
      color: "from-amber-500 to-yellow-500",
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-900/20",
      href: "/assessment/values"
    }
  ]

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-black dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-black dark:to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Career Assessment Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete these assessments to discover career paths that match your unique aptitudes, interests, and values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessmentSections.map((section) => (
            <Card key={section.id} className="bg-white dark:bg-black border-0 shadow-lg overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
              <CardHeader className={`${section.bgLight} ${section.bgDark}`}>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                    {section.icon}
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-base mb-6">
                  {section.description}
                </CardDescription>
                
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Time Required:</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">15-20 minutes</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Questions:</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">50 questions</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 transition-opacity`}
                  onClick={() => router.push(section.href)}
                >
                  Start Assessment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}