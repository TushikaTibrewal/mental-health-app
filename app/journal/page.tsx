"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { JournalEditor } from "@/components/journal-editor"
import { JournalEntryCard } from "@/components/journal-entry-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { PenTool, Search, Filter, BookOpen, Heart } from "lucide-react"
import { journalStorage, type JournalEntry, MOODS } from "@/lib/journal-storage"

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [moodFilter, setMoodFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEntries = () => {
      const savedEntries = journalStorage.getEntries()
      setEntries(savedEntries)
      setIsLoading(false)
    }

    loadEntries()
  }, [])

  const handleSaveEntry = (entry: JournalEntry) => {
    setEntries((prev) => [entry, ...prev])
    setIsWriting(false)
  }

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
      journalStorage.deleteEntry(id)
      setEntries((prev) => prev.filter((entry) => entry.id !== id))
    }
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesMood = moodFilter === "all" || entry.mood === moodFilter

    return matchesSearch && matchesMood
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your journal...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isWriting ? (
          <JournalEditor onSave={handleSaveEntry} onCancel={() => setIsWriting(false)} />
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Your Creative Journal</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                A safe space for your thoughts, feelings, and reflections. Write freely and authentically.
              </p>
            </div>

            {/* New Entry Button */}
            <div className="flex justify-center mb-8">
              <Button onClick={() => setIsWriting(true)} size="lg" className="text-lg px-8 py-6">
                <PenTool className="mr-2 h-5 w-5" />
                Write New Entry
              </Button>
            </div>

            {/* Filters */}
            {entries.length > 0 && (
              <Card className="mb-8 border-primary/20 bg-card/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search your entries..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 border-primary/20 focus:border-primary/40"
                        />
                      </div>
                    </div>
                    <div className="md:w-48">
                      <Select value={moodFilter} onValueChange={setMoodFilter}>
                        <SelectTrigger className="border-primary/20 focus:border-primary/40">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Moods</SelectItem>
                          {MOODS.map((mood) => (
                            <SelectItem key={mood.value} value={mood.value}>
                              <div className="flex items-center space-x-2">
                                <span className={`w-3 h-3 rounded-full ${mood.color.replace("text-", "bg-")}`} />
                                <span>{mood.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Entries */}
            {filteredEntries.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEntries.map((entry) => (
                  <JournalEntryCard key={entry.id} entry={entry} onDelete={handleDeleteEntry} />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <Card className="text-center py-16 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent>
                  <Heart className="h-16 w-16 text-primary/50 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">Start Your Journey</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
                    Your journal is empty, but full of potential. Take a moment to reflect and share what's on your
                    mind.
                  </p>
                  <Button onClick={() => setIsWriting(true)} size="lg">
                    <PenTool className="mr-2 h-5 w-5" />
                    Write Your First Entry
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12 border-primary/20 bg-card/50">
                <CardContent>
                  <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No entries found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  )
}
