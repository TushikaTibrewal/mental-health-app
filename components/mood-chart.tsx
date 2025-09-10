"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { MoodStats } from "@/lib/mood-storage"
import { MOODS } from "@/lib/journal-storage"
import { format, parseISO } from "date-fns"

interface MoodChartProps {
  stats: MoodStats
  period: "week" | "month"
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function MoodChart({ stats, period }: MoodChartProps) {
  const trendData = period === "week" ? stats.weeklyTrend : stats.monthlyTrend

  // Prepare line chart data
  const lineChartData = trendData.map((entry) => ({
    date: format(parseISO(entry.date), period === "week" ? "EEE" : "MMM dd"),
    intensity: entry.intensity,
    mood: entry.mood,
  }))

  // Prepare mood distribution data for pie chart
  const pieChartData = Object.entries(stats.moodDistribution).map(([mood, count]) => {
    const moodData = MOODS.find((m) => m.value === mood)
    return {
      name: moodData?.label || mood,
      value: count,
      mood: mood,
    }
  })

  // Prepare bar chart data for mood frequency
  const barChartData = Object.entries(stats.moodDistribution)
    .map(([mood, count]) => {
      const moodData = MOODS.find((m) => m.value === mood)
      return {
        mood: moodData?.label || mood,
        count: count,
        percentage: Math.round((count / stats.totalEntries) * 100),
      }
    })
    .sort((a, b) => b.count - a.count)

  if (stats.totalEntries === 0) {
    return (
      <Card className="border-primary/20">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No mood data available yet. Start tracking your mood to see insights!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mood Intensity Trend */}
      {lineChartData.length > 0 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Mood Intensity Trend</span>
              <span className="text-sm font-normal text-muted-foreground">
                (Last {period === "week" ? "7 days" : "30 days"})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[1, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `Intensity: ${value}`,
                    `Mood: ${MOODS.find((m) => m.value === props.payload.mood)?.label || props.payload.mood}`,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Distribution Pie Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value} entries`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieChartData.map((entry, index) => (
                <div key={entry.mood} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span>{entry.name}</span>
                  </div>
                  <span className="text-muted-foreground">{entry.value} entries</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mood Frequency Bar Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Mood Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barChartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="mood" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value} entries (${props.payload.percentage}%)`,
                    "Frequency",
                  ]}
                />
                <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
