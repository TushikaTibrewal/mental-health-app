"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, BookOpen, BarChart3, Music, Brain, Users } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Heart },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Mood Tracker", href: "/mood", icon: BarChart3 },
  { name: "Music", href: "/music", icon: Music },
  { name: "Self-Assessment", href: "/assessment", icon: Brain },
  { name: "Find Therapists", href: "/therapists", icon: Users },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">MindfulSpace</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
