"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/store/hooks"
import {
    Brain,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Target,
    CheckSquare,
    ArrowLeft,
    HelpCircle,
    Clock,
    Info
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Extract just the aptitude section from questionData
import { questionData } from "@/data/quentionData"
// const quesionSet = questionData.find(section => section.id === 1)

export default function AptitudePage({ Icon, color, bgColor, title, quesionSet, assessmentDescription }) {
    const router = useRouter()
    const { token } = useAppSelector(state => state.auth)

    const [currentAttribute, setCurrentAttribute] = useState(0)
    const [answers, setAnswers] = useState({})
    const [attributesCompleted, setAttributesCompleted] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showInstructions, setShowInstructions] = useState(true)
    const [timeStarted, setTimeStarted] = useState(null)
    const [timeElapsed, setTimeElapsed] = useState(0)

    const attributes = quesionSet?.attributes || []
    const currentAttributeData = attributes[currentAttribute] || {}

    // console.log("Test Data: ", title.split(" ")[0])

    // Timer effect
    useEffect(() => {
        if (timeStarted && !showInstructions) {
            const timer = setInterval(() => {
                setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000))
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [timeStarted, showInstructions])

    // Initialize answers
    useEffect(() => {
        if (!showInstructions && !timeStarted) {
            setTimeStarted(Date.now())
        }

        const initialAnswers = {}
        initialAnswers[quesionSet.id] = {}
        attributes.forEach((_, attributeIndex) => {
            initialAnswers[quesionSet.id][attributeIndex] = {}
        })

        setAnswers(prev => ({ ...initialAnswers, ...prev }))
    }, [showInstructions])

    // Check authentication
    useEffect(() => {
        if (!token || !token.user) {
            router.push("/login?callbackUrl=/assessment/aptitude")
        }
    }, [token, router])

    // Update attributes completed status when answers change
    useEffect(() => {
        const newAttributesCompleted = { ...attributesCompleted }

        if (!newAttributesCompleted[quesionSet.id]) {
            newAttributesCompleted[quesionSet.id] = {}
        }

        attributes.forEach((attribute, attrIndex) => {
            const allQuestionsAnswered = attribute.questions.every((_, qIndex) =>
                answers[quesionSet.id]?.[attrIndex]?.[qIndex] !== undefined
            )
            newAttributesCompleted[quesionSet.id][attrIndex] = allQuestionsAnswered
        })

        setAttributesCompleted(newAttributesCompleted)
    }, [answers, attributes])

    // Handle answer selection
    const handleAnswerSelect = (attributeIndex, questionIndex, value) => {
        const sectionId = quesionSet.id
        const newAnswers = { ...answers }

        if (!newAnswers[sectionId]) {
            newAnswers[sectionId] = {}
        }
        if (!newAnswers[sectionId][attributeIndex]) {
            newAnswers[sectionId][attributeIndex] = {}
        }

        newAnswers[sectionId][attributeIndex][questionIndex] = parseInt(value)
        setAnswers(newAnswers)
    }

    // Navigate between attributes
    const navigateAttribute = (direction) => {
        if (direction === 'next') {
            if (currentAttribute < attributes.length - 1) {
                setCurrentAttribute(currentAttribute + 1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                // Submit if all completed
                handleSubmitTest()
            }
        } else if (direction === 'prev') {
            if (currentAttribute > 0) {
                setCurrentAttribute(currentAttribute - 1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    // Submit test to backend
    const handleSubmitTest = async () => {
        if (!isAllCompleted()) {
            alert("Please answer all questions before submitting.")
            return
        }

        setIsSubmitting(true)

        try {
            // Prepare answers for API
            const payload = {
                userId: token.user.id,
                category: title.split(" ")[0],
                answers: [],
            }

            attributes.forEach((attribute, attrIndex) => {
                attribute.questions.forEach((questionText, qIndex) => {
                    const answerValue = answers[quesionSet.id]?.[attrIndex]?.[qIndex]
                    if (answerValue !== undefined) {
                        payload.answers.push({
                            attributeTitle: attribute.title,
                            questionIndex: qIndex,
                            questionText: questionText,
                            answerValue,
                        })
                    }
                })
            })

            console.log("Payload: ", payload)

            // Call API route to save answers
            const res = await fetch("/api/assessment/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                throw new Error("Failed to save assessment results")
            }

            // const data = await res.json()

            // Redirect to results page
            // router.push(`/assessment-results?id=${data.data.assessmentId}`)
        } catch (error) {
            console.error("Error submitting assessment:", error)
            alert("There was a problem submitting your assessment. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    // Get current progress percentage
    const getCurrentProgress = () => {
        const totalQuestions = attributes.reduce((sum, attr) => sum + attr.questions.length, 0)
        const answeredQuestions = Object.values(answers[quesionSet?.id] || {}).reduce((sum, attrAnswers) => {
            return sum + Object.keys(attrAnswers).length
        }, 0)

        return Math.round((answeredQuestions / totalQuestions) * 100)
    }

    // Check if current attribute is completed
    const isAttributeCompleted = (attributeIndex) => {
        return attributesCompleted[quesionSet?.id]?.[attributeIndex] || false
    }

    // Check if all attributes are completed
    const isAllCompleted = () => {
        return attributes.every((_, index) => isAttributeCompleted(index))
    }

    // If not authenticated, show loading
    if (!token || !token.user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Checking authentication...</p>
                </div>
            </div>
        )
    }

    // Render instructions
    if (showInstructions) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-black dark:to-black py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white dark:bg-black rounded-xl shadow-xl overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${color}`}></div>
                    <div className="p-8">
                        <div className="flex items-center justify-center mb-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${bgColor}`}>
                                <Icon />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
                        <p className="text-center text-muted-foreground mb-8">
                            Discover your cognitive strengths and abilities
                        </p>

                        <div className="space-y-6">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                    {assessmentDescription}
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Target className="h-5 w-5 text-purple-500" />
                                    Instructions
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-medium">1</div>
                                        <p>You'll be presented with 10 categories of aptitude, each with 5 questions.</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-medium">2</div>
                                        <p>Rate each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree) based on how accurately it describes you.</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-medium">3</div>
                                        <p>Be honest in your responses. This isn't a test with right or wrong answers - it's about understanding your unique aptitudes.</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-medium">4</div>
                                        <p>You must complete all questions to get your results. Your progress will be saved as you go.</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-medium">5</div>
                                        <p>The assessment takes approximately 15-20 minutes to complete.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
                                <h3 className="font-medium mb-2 flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4 text-purple-500" />
                                    What you'll discover:
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Your strongest cognitive abilities and natural talents</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Areas where your aptitude gives you a competitive advantage</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Career paths that best match your cognitive profile</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button
                                variant="outline"
                                onClick={() => router.push('/assessment')}
                                className="flex-1"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <Button
                                onClick={() => setShowInstructions(false)}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                            >
                                Begin Assessment
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Render the actual assessment
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-black dark:to-black py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/assessment')}
                        className="text-muted-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Assessments
                    </Button>

                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                            <Clock className="h-3.5 w-3.5 mr-0.5" />
                            Time: {formatTime(timeElapsed)}
                        </Badge>

                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">Aptitude Assessment</Badge>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="bg-white dark:bg-black rounded-lg shadow p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Overall Progress</div>
                        <div className="text-sm">{getCurrentProgress()}%</div>
                    </div>
                    <Progress value={getCurrentProgress()} className="h-2 bg-gray-100 dark:bg-gray-800">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </Progress>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Question {getCurrentProgress() * 0.5}/50</span>
                        <span>{attributes.filter((_, i) => isAttributeCompleted(i)).length}/{attributes.length} Categories Completed</span>
                    </div>
                </div>

                {/* Current attribute questions */}
                <Card className="bg-white/90 dark:bg-black/90 border-0 shadow-lg backdrop-blur-sm mb-6">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <Badge className="mb-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                    Category {currentAttribute + 1} of {attributes.length}
                                </Badge>
                                <CardTitle>{currentAttributeData.title}</CardTitle>
                                <CardDescription className="mt-2">
                                    Answer all 5 questions below to complete this category
                                </CardDescription>
                            </div>
                            <div className="w-full sm:w-32">
                                <div className="text-xs text-right mb-1">
                                    {isAttributeCompleted(currentAttribute) ? '100% complete' : 'In progress'}
                                </div>
                                <Progress
                                    value={isAttributeCompleted(currentAttribute) ? 100 :
                                        currentAttributeData.questions?.filter((_, i) =>
                                            answers[quesionSet.id]?.[currentAttribute]?.[i] !== undefined
                                        ).length / currentAttributeData.questions?.length * 100}
                                    className="h-2 bg-gray-100 dark:bg-gray-800"
                                >
                                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                </Progress>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {currentAttributeData.questions?.map((question, questionIndex) => (
                                <div
                                    key={questionIndex}
                                    className={`p-5 rounded-lg border ${answers[quesionSet.id]?.[currentAttribute]?.[questionIndex] !== undefined
                                        ? 'bg-slate-50/80 dark:bg-gray-900/50 border-slate-200 dark:border-slate-700'
                                        : 'bg-white dark:bg-black border-slate-200 dark:border-slate-700'
                                        }`}
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex-shrink-0 font-semibold text-sm">
                                            {questionIndex + 1}
                                        </div>
                                        <div className="text-lg">
                                            {question}
                                        </div>
                                    </div>

                                    <RadioGroup
                                        value={answers[quesionSet.id]?.[currentAttribute]?.[questionIndex]?.toString()}
                                        onValueChange={(value) => handleAnswerSelect(currentAttribute, questionIndex, value)}
                                        className="pt-2"
                                    >
                                        <div className="flex justify-between text-xs text-muted-foreground px-1 mb-2">
                                            <span>Strongly Disagree</span>
                                            <span>Strongly Agree</span>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <div key={value} className="flex-1">
                                                    <RadioGroupItem
                                                        value={value.toString()}
                                                        id={`rating-${questionIndex}-${value}`}
                                                        className="peer sr-only"
                                                    />
                                                    <Label
                                                        htmlFor={`rating-${questionIndex}-${value}`}
                                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-500 [&:has([data-state=checked])]:border-purple-500 cursor-pointer text-center h-full"
                                                    >
                                                        <span className="text-lg font-medium">{value}</span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>

                                    {answers[quesionSet.id]?.[currentAttribute]?.[questionIndex] !== undefined && (
                                        <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-3">
                                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                            Answered
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
                            {isAttributeCompleted(currentAttribute) ? (
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800/50">
                                    <CheckSquare className="h-3.5 w-3.5 mr-1" />
                                    All questions answered
                                </Badge>
                            ) : (
                                <span>
                                    {currentAttributeData.questions?.filter((_, i) =>
                                        answers[quesionSet.id]?.[currentAttribute]?.[i] !== undefined
                                    ).length || 0} of {currentAttributeData.questions?.length} questions answered
                                </span>
                            )}
                        </div>

                        <div className="flex w-full sm:w-auto gap-3">
                            <Button
                                variant="outline"
                                onClick={() => navigateAttribute('prev')}
                                disabled={currentAttribute === 0}
                                className="flex-1 sm:flex-none"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <Button
                                onClick={() => navigateAttribute('next')}
                                disabled={!isAttributeCompleted(currentAttribute)}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                            >
                                {currentAttribute < attributes.length - 1 ? (
                                    <>
                                        Next
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </>
                                ) : (
                                    "Complete Assessment"
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>

                {/* Category list */}
                <Card className="mb-8 bg-white dark:bg-black">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {attributes.map((attribute, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-md ${currentAttribute === index
                                            ? 'bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/50'
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer'
                                        }`}
                                    onClick={() => setCurrentAttribute(index)}
                                >
                                    <div className="flex items-center gap-3">
                                        {isAttributeCompleted(index) ? (
                                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <div className={`w-5 h-5 rounded-full border-2 ${currentAttribute === index
                                                    ? 'border-purple-500 bg-purple-100 dark:border-purple-400 dark:bg-purple-900/30'
                                                    : 'border-gray-300 dark:border-gray-600'
                                                }`} />
                                        )}
                                        <span className={currentAttribute === index ? 'font-medium' : ''}>
                                            {attribute.title}
                                        </span>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        {attribute.questions.filter((_, i) =>
                                            answers[quesionSet.id]?.[index]?.[i] !== undefined
                                        ).length || 0}/{attribute.questions.length}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Submit section */}
                <Card className="bg-white dark:bg-black">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="text-sm flex-1">
                                <p className="font-medium">Ready to submit your assessment?</p>
                                <p className="text-muted-foreground mt-1">
                                    {isAllCompleted()
                                        ? "You've completed all questions! Submit to view your results."
                                        : `You still have ${attributes.length - attributes.filter((_, i) => isAttributeCompleted(i)).length} categories remaining.`}
                                </p>
                            </div>
                            <Button
                                onClick={handleSubmitTest}
                                disabled={!isAllCompleted() || isSubmitting}
                                className="sm:w-auto w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin mr-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Assessment"
                                )}
                            </Button>
                        </div>

                        {!isAllCompleted() && (
                            <div className="mt-4 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md flex items-start gap-2">
                                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                <p>You must complete all questions in all categories before submitting.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}