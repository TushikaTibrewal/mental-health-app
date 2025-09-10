"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Heart, Brain, Lightbulb } from "lucide-react"
import type { MoodStats } from "@/lib/mood-storage"
import { MOODS } from "@/lib/journal-storage"
import { MOOD_INTENSITIES } from "@/lib/mood-storage"

interface MoodInsightsProps {
  stats: MoodStats
}

export function MoodInsights({ stats }: MoodInsightsProps) {
  if (stats.totalEntries === 0) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-primary/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Start Tracking for Insights</h3>
          <p className="text-muted-foreground">
            Track your mood for a few days to see personalized insights and patterns.
          </p>
        </CardContent>
      </Card>
    )
  }

  const mostCommonMoodData = MOODS.find((m) => m.value === stats.mostCommonMood)
  const averageIntensityData = MOOD_INTENSITIES.find((i) => i.value === Math.round(stats.averageIntensity))

  // Calculate trend from recent entries
  const recentEntries = stats.weeklyTrend.slice(-7)
  const trend =
    recentEntries.length >= 2 ? recentEntries[recentEntries.length - 1].intensity - recentEntries[0].intensity : 0

  // Generate insights based on data
  const insights = []

  if (stats.averageIntensity >= 4) {
    insights.push({
      type: "positive",
      icon: Heart,
      title: "Great Mental Health",
      description:
        "Your average mood intensity is high, indicating good mental well-being. Keep up the positive habits!",
    })
  } else if (stats.averageIntensity <= 2.5) {
    insights.push({
      type: "concern",
      icon: Target,
      title: "Focus on Self-Care",
      description:
        "Your mood intensity has been lower recently. Consider reaching out to friends, practicing self-care, or speaking with a counselor.",
    })
  }

  if (trend > 0.5) {
    insights.push({
      type: "positive",
      icon: TrendingUp,
      title: "Improving Trend",
      description: "Your mood has been trending upward recently. Whatever you're doing, it's working!",
    })
  } else if (trend < -0.5) {
    insights.push({
      type: "concern",
      icon: TrendingDown,
      title: "Declining Trend",
      description:
        "Your mood has been declining lately. This might be a good time to focus on stress management and self-care.",
    })
  }

  if (stats.totalEntries >= 7) {
    insights.push({
      type: "achievement",
      icon: Target,
      title: "Consistent Tracking",
      description:
        "Great job maintaining consistent mood tracking! This data will help you understand your patterns better.",
    })
  }

  // Mood-specific insights
  const moodCounts = Object.entries(stats.moodDistribution)
  const dominantMoods = moodCounts.filter(([, count]) => count / stats.totalEntries > 0.3)

  if (dominantMoods.length > 0) {
    const [dominantMood] = dominantMoods[0]
    const moodData = MOODS.find((m) => m.value === dominantMood)

    if (dominantMood === "anxious" || dominantMood === "stressed") {
      insights.push({
        type: "tip",
        icon: Lightbulb,
        title: "Stress Management",
        description:
          "You've been feeling anxious or stressed frequently. Try meditation, deep breathing exercises, or talking to someone you trust.",
      })
    } else if (dominantMood === "happy" || dominantMood === "grateful") {
      insights.push({
        type: "positive",
        icon: Heart,
        title: "Positive Mindset",
        description: `You've been feeling ${moodData?.label.toLowerCase()} often. This positive mindset is great for your overall well-being!`,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalEntries}</div>
            <div className="text-sm text-muted-foreground">Total Entries</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{stats.averageIntensity.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg Intensity</div>
            {averageIntensityData && (
              <Badge variant="secondary" className="mt-1 text-xs">
                {averageIntensityData.label}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-lg font-bold text-foreground">{mostCommonMoodData?.label || "N/A"}</div>
            <div className="text-sm text-muted-foreground">Most Common</div>
            {mostCommonMoodData && (
              <div className="flex justify-center mt-1">
                <span className={`w-3 h-3 rounded-full ${mostCommonMoodData.color.replace("text-", "bg-")}`} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-1">
              {trend > 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : trend < 0 ? (
                <TrendingDown className="h-5 w-5 text-red-500" />
              ) : (
                <Target className="h-5 w-5 text-gray-500" />
              )}
              <span className="text-lg font-bold">
                {trend > 0 ? "+" : ""}
                {trend.toFixed(1)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Weekly Trend</div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Personalized Insights</h3>
          <div className="grid gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <Card
                  key={index}
                  className={`border-primary/20 ${
                    insight.type === "positive"
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
                      : insight.type === "concern"
                        ? "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
                        : insight.type === "achievement"
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
                          : "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          insight.type === "positive"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : insight.type === "concern"
                              ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                              : insight.type === "achievement"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground text-pretty">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
