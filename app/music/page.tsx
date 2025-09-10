"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MusicPlayer } from "@/components/music-player"
import { MusicLibrary } from "@/components/music-library"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Heart, Headphones } from "lucide-react"
import { type Track, MUSIC_TRACKS, getTracksByCategory } from "@/lib/music-data"

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [playlist, setPlaylist] = useState<Track[]>(MUSIC_TRACKS)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track)
    const trackIndex = playlist.findIndex((t) => t.id === track.id)
    setCurrentIndex(trackIndex >= 0 ? trackIndex : 0)
    setIsPlaying(true)
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentIndex(nextIndex)
    setCurrentTrack(playlist[nextIndex])
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setCurrentTrack(playlist[prevIndex])
  }

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === "all") {
      setPlaylist(MUSIC_TRACKS)
    } else {
      const categoryTracks = getTracksByCategory(categoryId)
      setPlaylist(categoryTracks)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <Music className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Meditative Music</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find peace and focus with our curated collection of calming sounds, ambient music, and nature recordings
            designed to support your mental well-being.
          </p>
        </div>

        {/* Welcome Message */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-secondary/20">
                <Headphones className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Create Your Peaceful Space</h3>
                <p className="text-muted-foreground text-sm">
                  Use headphones for the best experience. Find a comfortable position and let the music guide you to a
                  state of calm and focus.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Music Library */}
          <div className="lg:col-span-2">
            <MusicLibrary
              currentTrack={currentTrack}
              onTrackSelect={handleTrackSelect}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Music Player */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <MusicPlayer
                currentTrack={currentTrack}
                playlist={playlist}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onTrackSelect={handleTrackSelect}
              />

              {/* Tips Card */}
              <Card className="mt-6 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold text-foreground">Listening Tips</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use the timer feature for meditation sessions</li>
                    <li>• Try different categories based on your current needs</li>
                    <li>• Lower the volume for background focus music</li>
                    <li>• Create a comfortable, distraction-free environment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
