import type { AssessmentResult } from "./assessment-data"

class AssessmentStorage {
  private readonly STORAGE_KEY = "mindful-assessment-results"

  getResults(): AssessmentResult[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const results = JSON.parse(stored)
      return results
        .map((result: any) => ({
          ...result,
          completedAt: new Date(result.completedAt),
        }))
        .sort((a: AssessmentResult, b: AssessmentResult) => b.completedAt.getTime() - a.completedAt.getTime())
    } catch {
      return []
    }
  }

  saveResult(result: AssessmentResult): void {
    const results = this.getResults()
    results.unshift(result)

    // Keep only the last 50 results
    const trimmedResults = results.slice(0, 50)

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedResults))
    }
  }

  getResultsByAssessment(assessmentId: string): AssessmentResult[] {
    return this.getResults().filter((result) => result.assessmentId === assessmentId)
  }

  deleteResult(id: string): boolean {
    const results = this.getResults()
    const filteredResults = results.filter((result) => result.id !== id)

    if (filteredResults.length === results.length) return false

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredResults))
    }

    return true
  }
}

export const assessmentStorage = new AssessmentStorage()
