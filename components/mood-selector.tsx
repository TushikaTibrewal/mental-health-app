"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { MOODS } from "@/lib/journal-storage"
import { MOOD_INTENSITIES, moodStorage, type MoodEntry } from "@/lib/mood-storage"

interface MoodSelectorProps {
  onSave: (entry: MoodEntry) => void
  selectedDate?: Date
}

export function MoodSelector({ onSave, selectedDate }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState("")
  const [intensity, setIntensity] = useState<number>(3)
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState<Date>(selectedDate || new Date())
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!selectedMood) return

    setIsSaving(true)

    try {
      const entry = moodStorage.saveEntry({
        mood: selectedMood,
        intensity,
        notes: notes.trim() || undefined,
        date,
      })

      onSave(entry)

      // Reset form
      setSelectedMood("")
      setIntensity(3)
      setNotes("")
      setDate(new Date())
    } catch (error) {
      console.error("Failed to save mood entry:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const selectedMoodData = MOODS.find((m) => m.value === selectedMood)
  const selectedIntensityData = MOOD_INTENSITIES.find((i) => i.value === intensity)

  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-secondary" />
          <CardTitle className="text-2xl">Log Your Mood</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-primary/20",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Mood Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">How are you feeling?</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MOODS.map((mood) => (
              <Button
                key={mood.value}
                type="button"
                variant={selectedMood === mood.value ? "default" : "outline"}
                className={cn(
                  "h-auto p-4 flex flex-col items-center space-y-2 transition-all",
                  selectedMood === mood.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/20 hover:border-primary/40 hover:bg-primary/5",
                )}
                onClick={() => setSelectedMood(mood.value)}
              >
                <span className={cn("w-4 h-4 rounded-full", mood.color.replace("text-", "bg-"))} />
                <span className="text-sm font-medium">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Intensity Selection */}
        {selectedMood && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Intensity Level
              {selectedIntensityData && (
                <span className="ml-2 text-muted-foreground">({selectedIntensityData.label})</span>
              )}
            </Label>
            <div className="flex space-x-2">
              {MOOD_INTENSITIES.map((level) => (
                <Button
                  key={level.value}
                  type="button"
                  variant={intensity === level.value ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex-1 h-12 flex flex-col items-center justify-center space-y-1",
                    intensity === level.value
                      ? "bg-primary text-primary-foreground"
                      : "border-primary/20 hover:border-primary/40",
                  )}
                  onClick={() => setIntensity(level.value)}
                >
                  <div className={cn("w-3 h-3 rounded-full", level.color)} />
                  <span className="text-xs">{level.value}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Notes (optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="What contributed to this mood? Any thoughts or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] border-primary/20 focus:border-primary/40 resize-none"
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={!selectedMood || isSaving} className="w-full" size="lg">
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Mood Entry
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
