export interface MoodEntry {
  id: string
  mood: string
  intensity: number // 1-5 scale
  notes?: string
  date: Date
  createdAt: Date
}

export interface MoodStats {
  totalEntries: number
  averageIntensity: number
  mostCommonMood: string
  moodDistribution: Record<string, number>
  weeklyTrend: Array<{ date: string; mood: string; intensity: number }>
  monthlyTrend: Array<{ date: string; mood: string; intensity: number }>
}

export const MOOD_INTENSITIES = [
  { value: 1, label: "Very Low", color: "bg-red-500" },
  { value: 2, label: "Low", color: "bg-orange-500" },
  { value: 3, label: "Moderate", color: "bg-yellow-500" },
  { value: 4, label: "Good", color: "bg-green-500" },
  { value: 5, label: "Excellent", color: "bg-emerald-500" },
]

class MoodStorage {
  private readonly STORAGE_KEY = "mindful-mood-entries"

  getEntries(): MoodEntry[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const entries = JSON.parse(stored)
      return entries
        .map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          createdAt: new Date(entry.createdAt),
        }))
        .sort((a: MoodEntry, b: MoodEntry) => b.date.getTime() - a.date.getTime())
    } catch {
      return []
    }
  }

  saveEntry(entry: Omit<MoodEntry, "id" | "createdAt">): MoodEntry {
    const newEntry: MoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }

    const entries = this.getEntries()

    // Remove any existing entry for the same date
    const filteredEntries = entries.filter((e) => e.date.toDateString() !== newEntry.date.toDateString())

    filteredEntries.push(newEntry)
    filteredEntries.sort((a, b) => b.date.getTime() - a.date.getTime())

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEntries))
    }

    return newEntry
  }

  getStats(): MoodStats {
    const entries = this.getEntries()

    if (entries.length === 0) {
      return {
        totalEntries: 0,
        averageIntensity: 0,
        mostCommonMood: "",
        moodDistribution: {},
        weeklyTrend: [],
        monthlyTrend: [],
      }
    }

    // Calculate basic stats
    const totalEntries = entries.length
    const averageIntensity = entries.reduce((sum, entry) => sum + entry.intensity, 0) / totalEntries

    // Mood distribution
    const moodDistribution: Record<string, number> = {}
    entries.forEach((entry) => {
      moodDistribution[entry.mood] = (moodDistribution[entry.mood] || 0) + 1
    })

    const mostCommonMood = Object.entries(moodDistribution).sort(([, a], [, b]) => b - a)[0]?.[0] || ""

    // Weekly trend (last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weeklyEntries = entries.filter((entry) => entry.date >= weekAgo)
    const weeklyTrend = weeklyEntries.map((entry) => ({
      date: entry.date.toISOString().split("T")[0],
      mood: entry.mood,
      intensity: entry.intensity,
    }))

    // Monthly trend (last 30 days)
    const monthAgo = new Date()
    monthAgo.setDate(monthAgo.getDate() - 30)
    const monthlyEntries = entries.filter((entry) => entry.date >= monthAgo)
    const monthlyTrend = monthlyEntries.map((entry) => ({
      date: entry.date.toISOString().split("T")[0],
      mood: entry.mood,
      intensity: entry.intensity,
    }))

    return {
      totalEntries,
      averageIntensity,
      mostCommonMood,
      moodDistribution,
      weeklyTrend,
      monthlyTrend,
    }
  }

  deleteEntry(id: string): boolean {
    const entries = this.getEntries()
    const filteredEntries = entries.filter((entry) => entry.id !== id)

    if (filteredEntries.length === entries.length) return false

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEntries))
    }

    return true
  }
}

export const moodStorage = new MoodStorage()
