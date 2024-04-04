export enum LANG {
  EN = 'en',
  FI = 'fi'
}

export interface Question {
  fi: string,
  en: string,
}

export interface QuestionResultWithoutId {
  question: string,
  correctAnswer: string,
  userAnswer?: string,
  isCorrect?: boolean
}

export interface QuestionResult extends QuestionResultWithoutId {
  id: number
}