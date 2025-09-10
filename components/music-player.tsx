"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Track, formatDuration, getCategoryById } from "@/lib/music-data"
import Image from "next/image"

interface MusicPlayerProps {
  currentTrack: Track | null
  playlist: Track[]
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrevious: () => void
  onTrackSelect: (track: Track) => void
}

export function MusicPlayer({
  currentTrack,
  playlist,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onTrackSelect,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(30)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        onNext()
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isRepeat, onNext])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!currentTrack) {
    return (
      <Card className="border-primary/20 bg-gradient-to-r from-card to-primary/5">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Select a Track</h3>
          <p className="text-muted-foreground">Choose from our curated collection of calming sounds</p>
        </CardContent>
      </Card>
    )
  }

  const category = getCategoryById(currentTrack.category)

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 sticky bottom-4 shadow-lg">
      <CardContent className="p-6">
        <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />

        {/* Track Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-primary/10 flex-shrink-0">
            <Image
              src={currentTrack.coverImage || "/placeholder.svg"}
              alt={currentTrack.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            {category && (
              <Badge variant="secondary" className="mt-1 text-xs">
                {category.name}
              </Badge>
            )}
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>{formatDuration(Math.floor(currentTime))}</div>
            <div>{formatDuration(currentTrack.duration)}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider value={[progress]} onValueChange={handleSeek} max={100} step={0.1} className="w-full" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShuffle(!isShuffle)}
            className={cn("h-8 w-8", isShuffle && "text-primary")}
          >
            <Shuffle className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onPrevious} className="h-10 w-10">
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            onClick={isPlaying ? onPause : onPlay}
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={onNext} className="h-10 w-10">
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRepeat(!isRepeat)}
            className={cn("h-8 w-8", isRepeat && "text-primary")}
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        {/* Volume and Timer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTimer(!showTimer)}
            className={cn("h-8 w-8", showTimer && "text-primary")}
          >
            <Clock className="h-4 w-4" />
          </Button>
        </div>

        {/* Timer Controls */}
        {showTimer && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Sleep Timer</span>
              <span className="text-sm text-muted-foreground">{timerMinutes} minutes</span>
            </div>
            <Slider
              value={[timerMinutes]}
              onValueChange={(value) => setTimerMinutes(value[0])}
              min={5}
              max={120}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5 min</span>
              <span>120 min</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
