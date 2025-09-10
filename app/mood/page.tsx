"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { MoodSelector } from "@/components/mood-selector"
import { MoodChart } from "@/components/mood-chart"
import { MoodInsights } from "@/components/mood-insights"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Plus, TrendingUp, Brain } from "lucide-react"
import { moodStorage, type MoodEntry, type MoodStats } from "@/lib/mood-storage"

export default function MoodPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [stats, setStats] = useState<MoodStats | null>(null)
  const [showSelector, setShowSelector] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      const savedEntries = moodStorage.getEntries()
      const moodStats = moodStorage.getStats()

      setEntries(savedEntries)
      setStats(moodStats)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleSaveEntry = (entry: MoodEntry) => {
    setEntries((prev) => {
      const filtered = prev.filter((e) => e.date.toDateString() !== entry.date.toDateString())
      return [entry, ...filtered].sort((a, b) => b.date.getTime() - a.date.getTime())
    })

    // Refresh stats
    const newStats = moodStorage.getStats()
    setStats(newStats)
    setShowSelector(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your mood data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSelector ? (
          <div className="space-y-6">
            <div className="text-center">
              <Button variant="ghost" onClick={() => setShowSelector(false)} className="mb-4">
                ← Back to Dashboard
              </Button>
            </div>
            <MoodSelector onSave={handleSaveEntry} />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Mood Tracker</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Track your emotional well-being and discover patterns to better understand your mental health journey.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center mb-8">
              <Button onClick={() => setShowSelector(true)} size="lg" className="text-lg px-8 py-6">
                <Plus className="mr-2 h-5 w-5" />
                Log Today's Mood
              </Button>
            </div>

            {stats && (
              <Tabs defaultValue="insights" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger value="insights" className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Insights</span>
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Weekly</span>
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Monthly</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="insights">
                  <MoodInsights stats={stats} />
                </TabsContent>

                <TabsContent value="weekly">
                  <MoodChart stats={stats} period="week" />
                </TabsContent>

                <TabsContent value="monthly">
                  <MoodChart stats={stats} period="month" />
                </TabsContent>
              </Tabs>
            )}

            {/* Empty State */}
            {stats?.totalEntries === 0 && (
              <Card className="text-center py-16 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent>
                  <BarChart3 className="h-16 w-16 text-primary/50 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">Start Your Mood Journey</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
                    Begin tracking your daily mood to gain insights into your emotional patterns and mental well-being.
                  </p>
                  <Button onClick={() => setShowSelector(true)} size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Log Your First Mood
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  )
}
