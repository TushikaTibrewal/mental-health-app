"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Phone, ExternalLink, ArrowLeft, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AssessmentResult } from "@/lib/assessment-data"

interface AssessmentResultsProps {
  result: AssessmentResult
  onBack: () => void
  onSave: () => void
}

export function AssessmentResults({ result, onBack, onSave }: AssessmentResultsProps) {
  const scorePercentage = (result.score / result.maxScore) * 100

  const getLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/20 dark:border-green-800"
      case "mild":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/20 dark:border-yellow-800"
      case "moderate":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/20 dark:border-orange-800"
      case "severe":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/20 dark:border-red-800"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-950/20 dark:border-gray-800"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-5 w-5" />
      case "mild":
      case "moderate":
      case "severe":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Results Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Assessment Results</CardTitle>
            <Badge variant="secondary">{new Date(result.completedAt).toLocaleDateString()}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Overview */}
          <div className={cn("p-6 rounded-lg border", getLevelColor(result.level))}>
            <div className="flex items-center space-x-3 mb-4">
              {getLevelIcon(result.level)}
              <h3 className="text-xl font-semibold">{result.title}</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">{result.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Score: {result.score} / {result.maxScore}
                </span>
                <span>{Math.round(scorePercentage)}%</span>
              </div>
              <Progress value={scorePercentage} className="h-2" />
            </div>
          </div>

          {/* Crisis Resources */}
          {result.level === "severe" && (
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Need Immediate Support?</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                      If you're having thoughts of self-harm or suicide, please reach out for help immediately.
                    </p>
                    <div className="space-y-1 text-sm">
                      <div>
                        • National Suicide Prevention Lifeline: <strong>988</strong>
                      </div>
                      <div>
                        • Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
                      </div>
                      <div>• Campus Counseling Center: Contact your student services</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>Personalized Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5 text-secondary" />
            <span>Helpful Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {result.resources.map((resource, index) => (
              <div key={index} className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm font-medium text-foreground">{resource}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Assessments</span>
        </Button>
        <Button onClick={onSave} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Save Results</span>
        </Button>
        <Button variant="outline" asChild className="flex items-center space-x-2 bg-transparent">
          <a href="/therapists">
            <ExternalLink className="h-4 w-4" />
            <span>Find Professional Help</span>
          </a>
        </Button>
      </div>
    </div>
  )
}
