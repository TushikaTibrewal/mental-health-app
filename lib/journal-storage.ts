export interface JournalEntry {
  id: string
  title: string
  content: string
  mood: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export const MOODS = [
  { value: "happy", label: "Happy", color: "text-yellow-500" },
  { value: "calm", label: "Calm", color: "text-blue-500" },
  { value: "anxious", label: "Anxious", color: "text-orange-500" },
  { value: "sad", label: "Sad", color: "text-gray-500" },
  { value: "excited", label: "Excited", color: "text-pink-500" },
  { value: "stressed", label: "Stressed", color: "text-red-500" },
  { value: "grateful", label: "Grateful", color: "text-green-500" },
  { value: "confused", label: "Confused", color: "text-purple-500" },
]

export const COMMON_TAGS = [
  "school",
  "relationships",
  "family",
  "work",
  "health",
  "goals",
  "reflection",
  "gratitude",
  "challenges",
  "growth",
  "dreams",
  "fears",
]

class JournalStorage {
  private readonly STORAGE_KEY = "mindful-journal-entries"

  getEntries(): JournalEntry[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const entries = JSON.parse(stored)
      return entries.map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt),
        updatedAt: new Date(entry.updatedAt),
      }))
    } catch {
      return []
    }
  }

  saveEntry(entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const entries = this.getEntries()
    entries.unshift(newEntry)

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries))
    }

    return newEntry
  }

  updateEntry(id: string, updates: Partial<Omit<JournalEntry, "id" | "createdAt">>): JournalEntry | null {
    const entries = this.getEntries()
    const index = entries.findIndex((entry) => entry.id === id)

    if (index === -1) return null

    entries[index] = {
      ...entries[index],
      ...updates,
      updatedAt: new Date(),
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries))
    }

    return entries[index]
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

export const journalStorage = new JournalStorage()
