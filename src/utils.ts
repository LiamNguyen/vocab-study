import { orderBy } from 'lodash'

import { LocalStorageItem, QuestionResult, TestHistory } from './types'

export const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
  // Convert both answers to lowercase for case insensitivity
  userAnswer = userAnswer.toLowerCase().trim()
  correctAnswer = correctAnswer.toLowerCase().trim()

  if (userAnswer === correctAnswer) return true

  // Calculate the minimum required matching characters count
  const minMatchingChars = Math.ceil(correctAnswer.length * 0.7)

  let matchingChars = 0
  let longestMatch = 0

  for (let i = 0; i < userAnswer.length; i++) {
    let currentMatchIndex = correctAnswer.indexOf(userAnswer[i], i)

    // If the current character in user's answer matches the character in correct answer
    if (currentMatchIndex === i) {
      matchingChars++
      // If the current match length is the longest, update the longestMatch variable
      if (matchingChars > longestMatch) {
        longestMatch = matchingChars
      }

      // If the matching characters count is equal to or greater than the required count, return true
      if (longestMatch >= minMatchingChars) {
        return true
      }
      // If the answer is too short (less than 4 chars), 2/3 is still correct
      if (correctAnswer.length < 4 && i === 1) {
        return matchingChars === 2
      }
    } else {
      // Reset the matching characters count to start matching from the beginning of correct answer again
      matchingChars = 0
    }
  }
  // If the loop completes without returning true, return false
  return false
}

export const fetchOngoingTest = (): QuestionResult[] => {
  const onGoingTest = localStorage.getItem(LocalStorageItem.ONGOING_TEST)
  return JSON.parse(onGoingTest) as QuestionResult[] || []
}

export const storeOngoingTest = (onGoingTest: QuestionResult[]) => {
  localStorage.setItem(LocalStorageItem.ONGOING_TEST, JSON.stringify(onGoingTest))
}

export const fetchCurrentQuestionId = (): number => {
  const currentQuestionId = localStorage.getItem(LocalStorageItem.CURRENT_QUESTION_ID)

  if (!currentQuestionId) return 0

  return parseInt(currentQuestionId)
}

export const storeCurrentQuestionId = (currentQuestionId: number) => {
  localStorage.setItem(LocalStorageItem.CURRENT_QUESTION_ID, currentQuestionId.toString())
}

export const fetchTestHistory = (): TestHistory[] => {
  const onGoingTest = localStorage.getItem(LocalStorageItem.TEST_HISTORY)
  return JSON.parse(onGoingTest) as TestHistory[] || []
}

export const storeTestHistory = (testHistory: TestHistory[]) => {
  localStorage.setItem(LocalStorageItem.ONGOING_TEST, JSON.stringify(testHistory))
}

export const updateTestHistory = (testResult: QuestionResult[]) => {
  const testHistory = fetchTestHistory()

  if (testHistory.length < 1 || testResult.length < 1) return

  let orderedTestHistory = orderBy(testHistory, ['id'], ['desc'])
  const latestTest = orderedTestHistory[0]

  orderedTestHistory.push({
    id: latestTest.id + 1,
    testResult,
    createdAt: new Date()
  })

  if (orderedTestHistory.length > 10) {
    orderedTestHistory.pop()
  }

  storeTestHistory(orderedTestHistory)
}