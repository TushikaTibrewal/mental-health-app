"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Save, Sparkles } from "lucide-react"
import { journalStorage, MOODS, COMMON_TAGS, type JournalEntry } from "@/lib/journal-storage"
import { cn } from "@/lib/utils"

interface JournalEditorProps {
  onSave: (entry: JournalEntry) => void
  onCancel: () => void
}

export function JournalEditor({ onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return

    setIsSaving(true)

    try {
      const entry = journalStorage.saveEntry({
        title: title.trim(),
        content: content.trim(),
        mood,
        tags,
      })

      onSave(entry)
    } catch (error) {
      console.error("Failed to save entry:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const selectedMood = MOODS.find((m) => m.value === mood)

  return (
    <Card className="w-full max-w-4xl mx-auto border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-secondary" />
          <CardTitle className="text-2xl">Create New Journal Entry</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Entry Title
          </Label>
          <Input
            id="title"
            placeholder="What's on your mind today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg border-primary/20 focus:border-primary/40"
          />
        </div>

        {/* Mood Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">How are you feeling?</Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger className="border-primary/20 focus:border-primary/40">
              <SelectValue placeholder="Select your current mood">
                {selectedMood && (
                  <span className="flex items-center space-x-2">
                    <span className={cn("w-3 h-3 rounded-full", selectedMood.color.replace("text-", "bg-"))} />
                    <span>{selectedMood.label}</span>
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {MOODS.map((moodOption) => (
                <SelectItem key={moodOption.value} value={moodOption.value}>
                  <div className="flex items-center space-x-2">
                    <span className={cn("w-3 h-3 rounded-full", moodOption.color.replace("text-", "bg-"))} />
                    <span>{moodOption.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content" className="text-sm font-medium">
            Your Thoughts
          </Label>
          <Textarea
            id="content"
            placeholder="Express yourself freely... There's no judgment here, only space for your authentic thoughts and feelings."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] text-base leading-relaxed border-primary/20 focus:border-primary/40 resize-none"
          />
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Tags (optional)</Label>

          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-2 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add New Tag */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(newTag)
                }
              }}
              className="flex-1 border-primary/20 focus:border-primary/40"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addTag(newTag)}
              disabled={!newTag.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Common Tags */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick tags:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_TAGS.filter((tag) => !tags.includes(tag))
                .slice(0, 8)
                .map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addTag(tag)}
                    className="h-7 px-3 text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary"
                  >
                    {tag}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || isSaving}
            className="min-w-[100px]"
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
