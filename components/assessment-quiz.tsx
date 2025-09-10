"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Assessment } from "@/lib/assessment-data"

interface AssessmentQuizProps {
  assessment: Assessment
  onComplete: (answers: Record<string, number>) => void
  onCancel: () => void
}

export function AssessmentQuiz({ assessment, onComplete, onCancel }: AssessmentQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const currentQuestion = assessment.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1
  const hasAnswer = answers[currentQuestion.id] !== undefined

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  if (showDisclaimer) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{assessment.icon}</span>
            <CardTitle className="text-2xl">{assessment.title}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Important Disclaimer</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">{assessment.disclaimer}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">About This Assessment</h3>
            <p className="text-muted-foreground leading-relaxed">{assessment.description}</p>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="secondary">{assessment.questions.length} questions</Badge>
              <Badge variant="secondary">~{assessment.estimatedTime} minutes</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Before You Begin</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Answer honestly based on how you've been feeling recently</li>
              <li>• There are no right or wrong answers</li>
              <li>• This assessment is for educational purposes only</li>
              <li>• If you're in crisis, please seek immediate professional help</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={() => setShowDisclaimer(false)} className="flex-1">
              I Understand, Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{assessment.icon}</span>
            <CardTitle className="text-xl">{assessment.title}</CardTitle>
          </div>
          <Badge variant="secondary">
            {currentQuestionIndex + 1} of {assessment.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground leading-relaxed">{currentQuestion.text}</h3>

          <div className="space-y-3">
            {currentQuestion.scaleLabels?.map((label, index) => (
              <Button
                key={index}
                variant={answers[currentQuestion.id] === index ? "default" : "outline"}
                onClick={() => handleAnswer(index)}
                className={cn(
                  "w-full justify-start text-left h-auto p-4 transition-all",
                  answers[currentQuestion.id] === index
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/20 hover:border-primary/40 hover:bg-primary/5",
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex-shrink-0",
                      answers[currentQuestion.id] === index
                        ? "bg-primary-foreground border-primary-foreground"
                        : "border-muted-foreground",
                    )}
                  />
                  <span className="text-sm">{label}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <Button onClick={handleNext} disabled={!hasAnswer} className="flex items-center space-x-2">
            <span>{isLastQuestion ? "Complete Assessment" : "Next"}</span>
            {!isLastQuestion && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
