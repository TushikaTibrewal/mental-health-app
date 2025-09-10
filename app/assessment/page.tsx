"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AssessmentQuiz } from "@/components/assessment-quiz"
import { AssessmentResults } from "@/components/assessment-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Users, AlertTriangle, History } from "lucide-react"
import { ASSESSMENTS, calculateAssessmentResult, type Assessment, type AssessmentResult } from "@/lib/assessment-data"
import { assessmentStorage } from "@/lib/assessment-storage"

export default function AssessmentPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const handleAssessmentSelect = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setCurrentResult(null)
  }

  const handleAssessmentComplete = (answers: Record<string, number>) => {
    if (!selectedAssessment) return

    const result = calculateAssessmentResult(selectedAssessment.id, answers)
    setCurrentResult(result)
  }

  const handleSaveResult = () => {
    if (currentResult) {
      assessmentStorage.saveResult(currentResult)
      // Could show a toast notification here
    }
  }

  const handleBack = () => {
    setSelectedAssessment(null)
    setCurrentResult(null)
  }

  const previousResults = assessmentStorage.getResults().slice(0, 5) // Show last 5 results

  if (currentResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AssessmentResults result={currentResult} onBack={handleBack} onSave={handleSaveResult} />
        </main>
      </div>
    )
  }

  if (selectedAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AssessmentQuiz assessment={selectedAssessment} onComplete={handleAssessmentComplete} onCancel={handleBack} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Mental Health Self-Assessment</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Gain insights into your mental health with evidence-based assessments. These tools can help you understand
            your current well-being and guide you toward appropriate resources and support.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Important Notice</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                  These assessments are educational tools and are not substitutes for professional medical advice,
                  diagnosis, or treatment. If you're experiencing a mental health crisis or having thoughts of
                  self-harm, please seek immediate professional help or contact emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Assessment Options */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Choose an Assessment</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {ASSESSMENTS.map((assessment) => (
                <Card
                  key={assessment.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30"
                  onClick={() => handleAssessmentSelect(assessment)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <span className="text-2xl">{assessment.icon}</span>
                      </div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {assessment.description}
                    </p>

                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {assessment.estimatedTime} min
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {assessment.questions.length} questions
                      </Badge>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 h-auto font-medium text-primary hover:text-primary"
                    >
                      Start Assessment →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assessment History */}
            {previousResults.length > 0 && (
              <Card className="border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <History className="h-5 w-5" />
                    <span>Recent Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {previousResults.map((result) => {
                    const assessment = ASSESSMENTS.find((a) => a.id === result.assessmentId)
                    return (
                      <div key={result.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{assessment?.title}</span>
                          <Badge
                            variant="secondary"
                            className={
                              result.level === "low"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : result.level === "mild"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : result.level === "moderate"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }
                          >
                            {result.title}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{result.completedAt.toLocaleDateString()}</p>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            {/* Support Resources */}
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Users className="h-5 w-5 text-secondary" />
                  <span>Need Support?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Remember, seeking help is a sign of strength. Professional support is available.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                    <a href="/therapists">Find a Therapist</a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                    <a href="tel:988">Crisis Hotline: 988</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Assessment Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Answer honestly based on recent feelings</li>
                  <li>• Take your time with each question</li>
                  <li>• Consider retaking assessments periodically</li>
                  <li>• Share results with a trusted professional</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
