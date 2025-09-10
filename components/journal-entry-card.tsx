"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Trash2 } from "lucide-react"
import { type JournalEntry, MOODS } from "@/lib/journal-storage"
import { cn } from "@/lib/utils"

interface JournalEntryCardProps {
  entry: JournalEntry
  onDelete: (id: string) => void
}

export function JournalEntryCard({ entry, onDelete }: JournalEntryCardProps) {
  const mood = MOODS.find((m) => m.value === entry.mood)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2">{entry.title}</h3>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(entry.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(entry.createdAt)}</span>
              </div>
            </div>

            {mood && (
              <div className="flex items-center space-x-2">
                <span className={cn("w-3 h-3 rounded-full", mood.color.replace("text-", "bg-"))} />
                <span className="text-sm text-muted-foreground">Feeling {mood.label.toLowerCase()}</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(entry.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 mb-4">{entry.content}</p>

        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entry.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-secondary/20 text-secondary-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
