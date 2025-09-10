import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, BookOpen, BarChart3, Music, Brain, Users, Sparkles } from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Creative Journaling",
    description:
      "Express your thoughts and feelings in a safe, private digital space designed to inspire reflection and growth.",
    icon: BookOpen,
    href: "/journal",
    color: "text-primary",
  },
  {
    title: "Mood Tracking",
    description:
      "Monitor your emotional well-being with visual insights and patterns to better understand your mental health journey.",
    icon: BarChart3,
    href: "/mood",
    color: "text-secondary",
  },
  {
    title: "Meditative Music",
    description:
      "Find peace with our curated collection of calming sounds and music designed to reduce stress and anxiety.",
    icon: Music,
    href: "/music",
    color: "text-primary",
  },
  {
    title: "Self-Assessment",
    description: "Gain insights into your mental health with guided questionnaires and personalized recommendations.",
    icon: Brain,
    href: "/assessment",
    color: "text-secondary",
  },
  {
    title: "Connect with Therapists",
    description: "Find qualified mental health professionals who understand the unique challenges of student life.",
    icon: Users,
    href: "/therapists",
    color: "text-primary",
  },
]

const inspirationalQuotes = [
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "It's okay to not be okay. What matters is that you're taking steps to feel better.",
  "You are stronger than you think, braver than you feel, and more loved than you know.",
  "Healing isn't linear. Be patient with yourself as you grow.",
]

export default function HomePage() {
  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Heart className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              MindfulSpace
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            A supportive digital sanctuary designed specifically for students navigating the challenges of higher
            education. Take care of your mental health with tools for reflection, tracking, and connection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/journal">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Journaling
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/mood">
                <BarChart3 className="mr-2 h-5 w-5" />
                Track Your Mood
              </Link>
            </Button>
          </div>
        </div>

        {/* Inspirational Quote */}
        <Card className="mb-16 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <Sparkles className="h-8 w-8 text-secondary mx-auto mb-4" />
            <blockquote className="text-lg font-medium text-foreground italic text-balance">"{randomQuote}"</blockquote>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 text-pretty">{feature.description}</CardDescription>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto font-medium text-primary hover:text-primary"
                  >
                    <Link href={feature.href}>Explore {feature.title} →</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Mental Health Journey Starts Here</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Remember, seeking support is a sign of strength, not weakness. Every small step you take towards better
              mental health matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/assessment">
                  <Brain className="mr-2 h-5 w-5" />
                  Take Self-Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Link href="/therapists">
                  <Users className="mr-2 h-5 w-5" />
                  Find Professional Help
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
