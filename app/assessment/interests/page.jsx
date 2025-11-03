'use client'

import AssessmentTemplate from "../../../components/AssessmentTemplate"
import { Brain, Heart, Target, ChevronRight, Lightbulb } from "lucide-react"
import { questionData } from "@/data/quentionData"

export default function InterestPage() {

    const icon = () => {
        return (
            <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" />
        )
    }

    return (
        <div>
            <AssessmentTemplate
                Icon={icon}
                title="Interests Assessment"
                color="from-pink-500 to-orange-500"
                bgColor= "bg-pink-100 dark:bg-pink-900/30"
                quesionSet={questionData.find(section => section.id === 2)}
                assessmentDescription="This assessment focuses specifically on your interests - the activities and subjects that naturally draw your attention and engagement."
            />
        </div>
    )
}