export interface Question {
  id: string
  text: string
  type: "scale" | "multiple-choice" | "yes-no"
  options?: string[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

export interface Assessment {
  id: string
  title: string
  description: string
  icon: string
  color: string
  estimatedTime: number
  questions: Question[]
  disclaimer: string
}

export interface AssessmentResult {
  id: string
  assessmentId: string
  score: number
  maxScore: number
  level: "low" | "mild" | "moderate" | "severe"
  title: string
  description: string
  recommendations: string[]
  resources: string[]
  completedAt: Date
}

// GAD-7 inspired anxiety assessment
const ANXIETY_QUESTIONS: Question[] = [
  {
    id: "anxiety-1",
    text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety-2",
    text: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety-3",
    text: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety-4",
    text: "Over the last 2 weeks, how often have you been bothered by trouble relaxing?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety-5",
    text: "Over the last 2 weeks, how often have you been bothered by being so restless that it's hard to sit still?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety-6",
    text: "Over the last 2 weeks, how often have you been bothered by becoming easily annoyed or irritable?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "anxiety-7",
    text: "Over the last 2 weeks, how often have you been bothered by feeling afraid as if something awful might happen?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
]

// PHQ-9 inspired depression assessment
const DEPRESSION_QUESTIONS: Question[] = [
  {
    id: "depression-1",
    text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "depression-2",
    text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "depression-3",
    text: "Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "depression-4",
    text: "Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "depression-5",
    text: "Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "depression-6",
    text: "Over the last 2 weeks, how often have you been bothered by feeling bad about yourself or that you are a failure or have let yourself or your family down?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: "depression-7",
    text: "Over the last 2 weeks, how often have you been bothered by trouble concentrating on things, such as reading or watching television?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 3,
    scaleLabels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
]

// Stress assessment questions
const STRESS_QUESTIONS: Question[] = [
  {
    id: "stress-1",
    text: "In the last month, how often have you been upset because of something that happened unexpectedly?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
  },
  {
    id: "stress-2",
    text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
  },
  {
    id: "stress-3",
    text: "In the last month, how often have you felt nervous and stressed?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
  },
  {
    id: "stress-4",
    text: "In the last month, how often have you felt confident about your ability to handle your personal problems?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
  },
  {
    id: "stress-5",
    text: "In the last month, how often have you felt that things were going your way?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
  },
  {
    id: "stress-6",
    text: "In the last month, how often have you found that you could not cope with all the things that you had to do?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
  },
]

// Well-being assessment
const WELLBEING_QUESTIONS: Question[] = [
  {
    id: "wellbeing-1",
    text: "How satisfied are you with your life as a whole these days?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 10,
    scaleLabels: [
      "Not at all satisfied",
      "",
      "",
      "",
      "",
      "Moderately satisfied",
      "",
      "",
      "",
      "",
      "Completely satisfied",
    ],
  },
  {
    id: "wellbeing-2",
    text: "How often do you feel happy?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: "wellbeing-3",
    text: "How often do you feel that your life has meaning and purpose?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: "wellbeing-4",
    text: "How often do you feel connected to others?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: "wellbeing-5",
    text: "How often do you feel optimistic about your future?",
    type: "scale",
    scaleMin: 0,
    scaleMax: 4,
    scaleLabels: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
]

export const ASSESSMENTS: Assessment[] = [
  {
    id: "anxiety",
    title: "Anxiety Assessment",
    description: "Evaluate your anxiety levels and get personalized recommendations for managing anxious feelings.",
    icon: "🌊",
    color: "text-blue-500",
    estimatedTime: 5,
    questions: ANXIETY_QUESTIONS,
    disclaimer:
      "This assessment is based on the GAD-7 scale and is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    id: "depression",
    title: "Mood Assessment",
    description: "Understand your mood patterns and discover strategies for improving your emotional well-being.",
    icon: "🌱",
    color: "text-green-500",
    estimatedTime: 5,
    questions: DEPRESSION_QUESTIONS,
    disclaimer:
      "This assessment is based on the PHQ-9 scale and is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    id: "stress",
    title: "Stress Assessment",
    description: "Measure your stress levels and learn effective coping strategies for academic and life pressures.",
    icon: "⚡",
    color: "text-orange-500",
    estimatedTime: 4,
    questions: STRESS_QUESTIONS,
    disclaimer:
      "This assessment is based on the Perceived Stress Scale and is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    id: "wellbeing",
    title: "Well-being Assessment",
    description: "Explore your overall life satisfaction and discover ways to enhance your mental wellness.",
    icon: "✨",
    color: "text-purple-500",
    estimatedTime: 3,
    questions: WELLBEING_QUESTIONS,
    disclaimer:
      "This assessment measures subjective well-being and is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
]

export function calculateAssessmentResult(assessmentId: string, answers: Record<string, number>): AssessmentResult {
  const assessment = ASSESSMENTS.find((a) => a.id === assessmentId)
  if (!assessment) {
    throw new Error("Assessment not found")
  }

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
  const maxScore = assessment.questions.reduce((sum, q) => sum + (q.scaleMax || 0), 0)

  let level: "low" | "mild" | "moderate" | "severe"
  let title: string
  let description: string
  let recommendations: string[]
  let resources: string[]

  switch (assessmentId) {
    case "anxiety":
      if (totalScore <= 4) {
        level = "low"
        title = "Minimal Anxiety"
        description = "Your responses suggest minimal anxiety symptoms. You're managing stress well!"
        recommendations = [
          "Continue your current stress management practices",
          "Maintain regular exercise and healthy sleep habits",
          "Practice mindfulness or meditation to prevent future anxiety",
          "Stay connected with supportive friends and family",
        ]
        resources = ["Mindfulness apps", "Regular exercise routine", "Stress prevention techniques"]
      } else if (totalScore <= 9) {
        level = "mild"
        title = "Mild Anxiety"
        description = "You're experiencing some anxiety symptoms that may benefit from attention and self-care."
        recommendations = [
          "Practice deep breathing exercises daily",
          "Try progressive muscle relaxation techniques",
          "Limit caffeine and alcohol consumption",
          "Establish a regular sleep schedule",
          "Consider talking to a counselor if symptoms persist",
        ]
        resources = ["Breathing exercises", "Relaxation techniques", "Sleep hygiene tips", "Campus counseling services"]
      } else if (totalScore <= 14) {
        level = "moderate"
        title = "Moderate Anxiety"
        description =
          "Your anxiety levels are elevated and may be impacting your daily life. Professional support could be helpful."
        recommendations = [
          "Consider speaking with a mental health professional",
          "Practice anxiety management techniques daily",
          "Join a support group or anxiety management workshop",
          "Limit exposure to anxiety triggers when possible",
          "Focus on self-care and stress reduction",
        ]
        resources = [
          "Professional counseling",
          "Anxiety support groups",
          "Stress management workshops",
          "Mental health apps",
        ]
      } else {
        level = "severe"
        title = "Severe Anxiety"
        description =
          "Your responses indicate significant anxiety that may require professional attention. Please consider reaching out for support."
        recommendations = [
          "Seek professional help from a mental health provider",
          "Contact your campus counseling center",
          "Consider medication evaluation if recommended by a professional",
          "Build a strong support network",
          "Practice crisis management techniques",
        ]
        resources = [
          "Emergency mental health services",
          "Campus counseling center",
          "Professional therapy",
          "Crisis hotlines",
        ]
      }
      break

    case "depression":
      if (totalScore <= 4) {
        level = "low"
        title = "Minimal Depression"
        description = "Your mood appears to be stable with minimal depressive symptoms."
        recommendations = [
          "Maintain your current positive habits",
          "Stay socially connected",
          "Continue regular physical activity",
          "Practice gratitude and positive thinking",
        ]
        resources = ["Social activities", "Exercise programs", "Gratitude practices", "Positive psychology resources"]
      } else if (totalScore <= 9) {
        level = "mild"
        title = "Mild Depression"
        description = "You may be experiencing some depressive symptoms that could benefit from attention."
        recommendations = [
          "Increase physical activity and outdoor time",
          "Maintain social connections and seek support",
          "Practice self-care and stress management",
          "Consider talking to a counselor",
          "Focus on sleep hygiene and nutrition",
        ]
        resources = ["Exercise programs", "Social support groups", "Self-care guides", "Campus counseling"]
      } else if (totalScore <= 14) {
        level = "moderate"
        title = "Moderate Depression"
        description = "Your responses suggest moderate depressive symptoms that may benefit from professional support."
        recommendations = [
          "Seek professional counseling or therapy",
          "Consider joining a support group",
          "Maintain daily routines and structure",
          "Focus on basic self-care needs",
          "Stay connected with trusted friends or family",
        ]
        resources = ["Professional therapy", "Depression support groups", "Mental health services", "Crisis support"]
      } else {
        level = "severe"
        title = "Severe Depression"
        description =
          "Your responses indicate significant depressive symptoms. Professional help is strongly recommended."
        recommendations = [
          "Seek immediate professional help",
          "Contact your campus counseling center",
          "Consider medication evaluation",
          "Build a crisis support plan",
          "Reach out to trusted friends, family, or professionals",
        ]
        resources = [
          "Emergency mental health services",
          "Professional therapy",
          "Crisis hotlines",
          "Campus mental health center",
        ]
      }
      break

    case "stress":
      const stressPercentage = (totalScore / maxScore) * 100
      if (stressPercentage <= 25) {
        level = "low"
        title = "Low Stress"
        description = "You're managing stress well and have good coping mechanisms in place."
        recommendations = [
          "Continue your current stress management practices",
          "Maintain work-life balance",
          "Keep up healthy lifestyle habits",
          "Share your coping strategies with others",
        ]
        resources = ["Stress prevention techniques", "Wellness programs", "Healthy lifestyle guides"]
      } else if (stressPercentage <= 50) {
        level = "mild"
        title = "Moderate Stress"
        description = "You're experiencing some stress that could benefit from additional coping strategies."
        recommendations = [
          "Practice time management and organization",
          "Learn new stress reduction techniques",
          "Increase physical activity",
          "Consider stress management workshops",
        ]
        resources = ["Time management tools", "Stress reduction techniques", "Campus wellness programs"]
      } else if (stressPercentage <= 75) {
        level = "moderate"
        title = "High Stress"
        description = "Your stress levels are elevated and may be impacting your well-being and performance."
        recommendations = [
          "Prioritize stress management activities",
          "Consider counseling or stress management therapy",
          "Evaluate and reduce stressors where possible",
          "Build stronger support networks",
        ]
        resources = ["Stress management counseling", "Support groups", "Relaxation programs", "Mental health services"]
      } else {
        level = "severe"
        title = "Very High Stress"
        description = "You're experiencing very high stress levels that require immediate attention and support."
        recommendations = [
          "Seek professional help for stress management",
          "Consider taking a break or reducing commitments",
          "Focus on basic self-care and stress relief",
          "Build a strong support system",
        ]
        resources = [
          "Professional counseling",
          "Crisis support",
          "Stress management programs",
          "Emergency mental health services",
        ]
      }
      break

    case "wellbeing":
      const wellbeingPercentage = (totalScore / maxScore) * 100
      if (wellbeingPercentage >= 80) {
        level = "low" // Low concern, high well-being
        title = "High Well-being"
        description = "You're experiencing high levels of life satisfaction and positive mental health."
        recommendations = [
          "Continue your positive practices",
          "Share your well-being strategies with others",
          "Maintain your support systems",
          "Consider helping others improve their well-being",
        ]
        resources = ["Positive psychology resources", "Volunteer opportunities", "Wellness communities"]
      } else if (wellbeingPercentage >= 60) {
        level = "mild"
        title = "Moderate Well-being"
        description = "Your well-being is generally positive with room for enhancement."
        recommendations = [
          "Focus on activities that bring you joy",
          "Strengthen social connections",
          "Explore new interests and hobbies",
          "Practice gratitude and mindfulness",
        ]
        resources = ["Happiness programs", "Social activities", "Mindfulness resources", "Hobby groups"]
      } else if (wellbeingPercentage >= 40) {
        level = "moderate"
        title = "Lower Well-being"
        description = "Your well-being could benefit from focused attention and support."
        recommendations = [
          "Consider counseling to explore life satisfaction",
          "Focus on building meaningful relationships",
          "Explore activities that align with your values",
          "Practice self-compassion and self-care",
        ]
        resources = ["Life coaching", "Counseling services", "Support groups", "Values exploration workshops"]
      } else {
        level = "severe"
        title = "Low Well-being"
        description = "Your responses suggest low life satisfaction that may benefit from professional support."
        recommendations = [
          "Consider professional counseling or therapy",
          "Focus on basic self-care and mental health",
          "Seek support from trusted friends or family",
          "Explore what gives your life meaning and purpose",
        ]
        resources = ["Professional therapy", "Mental health services", "Support groups", "Crisis counseling"]
      }
      break

    default:
      level = "low"
      title = "Assessment Complete"
      description = "Thank you for completing the assessment."
      recommendations = ["Review your responses and consider next steps"]
      resources = ["General mental health resources"]
  }

  return {
    id: crypto.randomUUID(),
    assessmentId,
    score: totalScore,
    maxScore,
    level,
    title,
    description,
    recommendations,
    resources,
    completedAt: new Date(),
  }
}
