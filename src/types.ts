export enum LANG {
  EN = 'en',
  FI = 'fi'
}

export enum LocalStorageItem {
  ONGOING_TEST = 'onGoingTest',
  TEST_HISTORY = 'testHistory',
  CURRENT_QUESTION_ID = 'currentQuestionId'
}

export enum ActionName {
  UPDATE_TEST_SET = 'update_test_set',
  UPDATE_QUESTION_ID = 'update_question_id'
}

export interface Kappale {
  id: number
  kappale: string
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

export interface TestHistory {
  id: number,
  testResult: QuestionResult[],
  createdAt: Date
}

export interface AppState {
  testSet: QuestionResult[],
  currentQuestionId: number
}