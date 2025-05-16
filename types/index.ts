// 사용자 타입
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  role: "user" | "admin"
}

// 감정일기 타입
export interface EmotionDiary {
  id: string
  userId: string
  emotion: Emotion
  content: string
  createdAt: string
  updatedAt: string
}

export type Emotion = "happy" | "sad" | "angry" | "anxious" | "neutral" | "excited" | "tired"

export const emotionEmojis: Record<Emotion, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  anxious: "😰",
  neutral: "😐",
  excited: "😃",
  tired: "😴",
}

export const emotionLabels: Record<Emotion, string> = {
  happy: "행복",
  sad: "슬픔",
  angry: "분노",
  anxious: "불안",
  neutral: "보통",
  excited: "신남",
  tired: "피곤",
}

// 자가진단 타입
export type DiagnosisType = "PHQ-9" | "GAD-7"

export interface DiagnosisQuestion {
  id: number
  text: string
}

export interface DiagnosisResult {
  id: string
  userId: string
  type: DiagnosisType
  score: number
  answers: number[]
  message: string
  createdAt: string
}

export interface DiagnosisLevel {
  min: number
  max: number
  level: string
  message: string
}

// 상담센터 타입
export interface CounselingCenter {
  id: string
  name: string
  address: string
  type: string
  website: string
  phone: string
  region: string
}

// 정보공간 타입
export type ContentType = "infoCard" | "recoveryContent"

export interface InformationContent {
  id: string
  title: string
  type: ContentType
  thumbnail: string
  content: string
  url?: string
  createdAt: string
  updatedAt: string
}

// 통계 타입
export interface EmotionStatistics {
  emotion: Emotion
  count: number
}

export interface AdminStatistics {
  userCount: number
  diaryCount: number
  diagnosisCount: {
    phq9: number
    gad7: number
  }
  emotionStats: EmotionStatistics[]
}
