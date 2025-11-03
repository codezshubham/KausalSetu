'use client'

import AssessmentTemplate from "../../../components/AssessmentTemplate"
import { Brain, Heart, Target, ChevronRight, Lightbulb } from "lucide-react"
import { questionData } from "@/data/quentionData"

export default function ValuePage() {

    const icon = () => {
        return (
            <Lightbulb className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        )
    }

    return (
        <div>
            <AssessmentTemplate
                Icon={icon}
                title="Values Assessment"
                color="from-amber-500 to-yellow-500"
                bgColor= "bg-amber-100 dark:bg-amber-900/30"
                quesionSet={questionData.find(section => section.id === 3)}
                assessmentDescription="This assessment focuses specifically on your values - the core principles and beliefs that are most important to you."
            />
        </div>
    )
}