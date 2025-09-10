"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Play, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Track, MUSIC_CATEGORIES, MUSIC_TRACKS, formatDuration } from "@/lib/music-data"
import Image from "next/image"

interface MusicLibraryProps {
  currentTrack: Track | null
  onTrackSelect: (track: Track) => void
  onCategorySelect: (categoryId: string) => void
}

export function MusicLibrary({ currentTrack, onTrackSelect, onCategorySelect }: MusicLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTracks = MUSIC_TRACKS.filter((track) => {
    const matchesCategory = selectedCategory === "all" || track.category === selectedCategory
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategorySelect(categoryId)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for music, artists, or moods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-primary/20 focus:border-primary/40"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryClick("all")}
            className="h-auto p-4 flex flex-col items-center space-y-2"
          >
            <span className="text-2xl">🎵</span>
            <span className="text-sm font-medium">All Music</span>
          </Button>

          {MUSIC_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryClick(category.id)}
              className="h-auto p-4 flex flex-col items-center space-y-2 border-primary/20 hover:border-primary/40"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {selectedCategory === "all" ? "All Tracks" : MUSIC_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <span className="text-sm text-muted-foreground">{filteredTracks.length} tracks</span>
        </div>

        <div className="grid gap-4">
          {filteredTracks.map((track) => {
            const isCurrentTrack = currentTrack?.id === track.id
            const category = MUSIC_CATEGORIES.find((c) => c.id === track.category)

            return (
              <Card
                key={track.id}
                className={cn(
                  "group hover:shadow-md transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30",
                  isCurrentTrack && "border-primary bg-primary/5",
                )}
                onClick={() => onTrackSelect(track)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-primary/10 flex-shrink-0">
                      <Image
                        src={track.coverImage || "/placeholder.svg"}
                        alt={track.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{track.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {category && (
                          <Badge variant="secondary" className="text-xs">
                            {category.name}
                          </Badge>
                        )}
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDuration(track.duration)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        isCurrentTrack && "opacity-100 text-primary",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onTrackSelect(track)
                      }}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTracks.length === 0 && (
          <Card className="border-primary/20">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tracks found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
