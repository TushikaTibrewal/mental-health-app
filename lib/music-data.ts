export interface Track {
  id: string
  title: string
  artist: string
  duration: number // in seconds
  category: string
  description: string
  audioUrl: string
  coverImage: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export const MUSIC_CATEGORIES: Category[] = [
  {
    id: "focus",
    name: "Focus & Study",
    description: "Enhance concentration and productivity",
    icon: "🎯",
    color: "text-blue-500",
  },
  {
    id: "relaxation",
    name: "Relaxation",
    description: "Unwind and release tension",
    icon: "🌸",
    color: "text-pink-500",
  },
  {
    id: "sleep",
    name: "Sleep & Rest",
    description: "Peaceful sounds for better sleep",
    icon: "🌙",
    color: "text-purple-500",
  },
  {
    id: "nature",
    name: "Nature Sounds",
    description: "Connect with the natural world",
    icon: "🌿",
    color: "text-green-500",
  },
  {
    id: "meditation",
    name: "Meditation",
    description: "Guided and ambient meditation",
    icon: "🧘",
    color: "text-orange-500",
  },
  {
    id: "anxiety",
    name: "Anxiety Relief",
    description: "Calming sounds for stress reduction",
    icon: "💙",
    color: "text-cyan-500",
  },
]

export const MUSIC_TRACKS: Track[] = [
  // Focus & Study
  {
    id: "focus-1",
    title: "Deep Focus Flow",
    artist: "Mindful Sounds",
    duration: 1800, // 30 minutes
    category: "focus",
    description: "Ambient tones designed to enhance concentration and mental clarity",
    audioUrl: "/placeholder.mp3",
    coverImage: "/abstract-blue-waves-for-focus-music.jpg",
  },
  {
    id: "focus-2",
    title: "Study Session",
    artist: "Calm Collective",
    duration: 2700, // 45 minutes
    category: "focus",
    description: "Gentle instrumental music perfect for studying and reading",
    audioUrl: "/placeholder.mp3",
    coverImage: "/minimalist-geometric-patterns-for-study-music.jpg",
  },
  {
    id: "focus-3",
    title: "Productivity Boost",
    artist: "Focus Lab",
    duration: 3600, // 60 minutes
    category: "focus",
    description: "Energizing yet calm sounds to maintain focus throughout work",
    audioUrl: "/placeholder.mp3",
    coverImage: "/clean-modern-workspace-aesthetic.jpg",
  },

  // Relaxation
  {
    id: "relax-1",
    title: "Evening Unwind",
    artist: "Serenity Studio",
    duration: 1200, // 20 minutes
    category: "relaxation",
    description: "Soft melodies to help you transition from day to evening",
    audioUrl: "/placeholder.mp3",
    coverImage: "/sunset-colors-peaceful-landscape.jpg",
  },
  {
    id: "relax-2",
    title: "Stress Release",
    artist: "Peaceful Mind",
    duration: 1500, // 25 minutes
    category: "relaxation",
    description: "Calming sounds designed to melt away tension and worry",
    audioUrl: "/placeholder.mp3",
    coverImage: "/soft-pink-and-purple-gradient-clouds.jpg",
  },
  {
    id: "relax-3",
    title: "Inner Peace",
    artist: "Tranquil Tones",
    duration: 2100, // 35 minutes
    category: "relaxation",
    description: "Gentle ambient music for deep relaxation and peace",
    audioUrl: "/placeholder.mp3",
    coverImage: "/zen-garden-with-soft-lighting.jpg",
  },

  // Sleep & Rest
  {
    id: "sleep-1",
    title: "Dreamscape",
    artist: "Night Sounds",
    duration: 3600, // 60 minutes
    category: "sleep",
    description: "Ethereal soundscapes to guide you into peaceful sleep",
    audioUrl: "/placeholder.mp3",
    coverImage: "/starry-night-sky-with-soft-moonlight.jpg",
  },
  {
    id: "sleep-2",
    title: "Bedtime Stories",
    artist: "Sleep Well",
    duration: 2400, // 40 minutes
    category: "sleep",
    description: "Gentle instrumental lullabies for restful sleep",
    audioUrl: "/placeholder.mp3",
    coverImage: "/cozy-bedroom-with-warm-lighting.jpg",
  },

  // Nature Sounds
  {
    id: "nature-1",
    title: "Forest Rain",
    artist: "Nature's Symphony",
    duration: 1800, // 30 minutes
    category: "nature",
    description: "Gentle rainfall in a peaceful forest setting",
    audioUrl: "/placeholder.mp3",
    coverImage: "/rain-drops-on-green-forest-leaves.jpg",
  },
  {
    id: "nature-2",
    title: "Ocean Waves",
    artist: "Coastal Calm",
    duration: 2700, // 45 minutes
    category: "nature",
    description: "Rhythmic ocean waves on a quiet beach",
    audioUrl: "/placeholder.mp3",
    coverImage: "/peaceful-ocean-waves-on-sandy-beach.jpg",
  },
  {
    id: "nature-3",
    title: "Mountain Stream",
    artist: "Alpine Sounds",
    duration: 2100, // 35 minutes
    category: "nature",
    description: "Babbling brook flowing through mountain meadows",
    audioUrl: "/placeholder.mp3",
    coverImage: "/crystal-clear-mountain-stream-with-rocks.jpg",
  },

  // Meditation
  {
    id: "meditation-1",
    title: "Mindful Breathing",
    artist: "Meditation Guide",
    duration: 900, // 15 minutes
    category: "meditation",
    description: "Guided breathing exercise with gentle background tones",
    audioUrl: "/placeholder.mp3",
    coverImage: "/meditating-person.png",
  },
  {
    id: "meditation-2",
    title: "Body Scan Relaxation",
    artist: "Wellness Center",
    duration: 1200, // 20 minutes
    category: "meditation",
    description: "Progressive relaxation technique with calming music",
    audioUrl: "/placeholder.mp3",
    coverImage: "/peaceful-meditation-space-with-candles.jpg",
  },

  // Anxiety Relief
  {
    id: "anxiety-1",
    title: "Calm Anxiety",
    artist: "Healing Sounds",
    duration: 1500, // 25 minutes
    category: "anxiety",
    description: "Specially designed frequencies to reduce anxiety and promote calm",
    audioUrl: "/placeholder.mp3",
    coverImage: "/soft-blue-healing-light-patterns.jpg",
  },
  {
    id: "anxiety-2",
    title: "Peaceful Mind",
    artist: "Serenity Now",
    duration: 1800, // 30 minutes
    category: "anxiety",
    description: "Soothing melodies to quiet racing thoughts and worries",
    audioUrl: "/placeholder.mp3",
    coverImage: "/calm-lake-reflection-with-soft-colors.jpg",
  },
]

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function getTracksByCategory(categoryId: string): Track[] {
  return MUSIC_TRACKS.filter((track) => track.category === categoryId)
}

export function getCategoryById(categoryId: string): Category | undefined {
  return MUSIC_CATEGORIES.find((category) => category.id === categoryId)
}
