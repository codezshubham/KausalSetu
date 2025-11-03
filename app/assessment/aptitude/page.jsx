'use client'

import AssessmentTemplate from "../../../components/AssessmentTemplate"
import { Brain, Heart, Target, ChevronRight, Lightbulb } from "lucide-react"
import { questionData } from "@/data/quentionData"

export default function AptitudePage() {

  const icon = () => {
    return (
      <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
    )
  }

  return (
    <div>
      <AssessmentTemplate
        Icon={icon}
        title="Aptitude Assessment"
        color="from-purple-500 to-blue-500"
        bgColor= "bg-purple-100 dark:bg-purple-900/30"
        quesionSet={questionData.find(section => section.id === 1)}
        assessmentDescription="This assessment focuses specifically on your aptitude - your natural abilities and skills."
      />
    </div>
  )
}