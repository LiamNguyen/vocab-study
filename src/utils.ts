import { find, matchesProperty, orderBy, shuffle, slice } from 'lodash'

import { LANG, LocalStorageItem, Question, QuestionResult, QuestionResultWithoutId, TestHistory } from './types'
import { MAX_HISTORY } from './constants'

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
  localStorage.setItem(LocalStorageItem.TEST_HISTORY, JSON.stringify(testHistory))
}

export const updateTestHistory = (testResult: QuestionResult[]) => {
  if (testResult.length < 1) return

  let testHistory = fetchTestHistory()

  if (testHistory.length < 1) {
    testHistory.push({
      id: 1,
      testResult,
      createdAt: new Date()
    })
    storeTestHistory(testHistory)

    return
  }

  let orderedTestHistory = orderBy(testHistory, ['id'], ['desc'])
  const latestTest = orderedTestHistory[0]

  orderedTestHistory.unshift({
    id: latestTest.id + 1,
    testResult,
    createdAt: new Date()
  })
  if (orderedTestHistory.length > MAX_HISTORY) {
    orderedTestHistory.pop()
  }

  storeTestHistory(orderedTestHistory)
}

const randomizeLangSelection = (testSet: Question[]) => {
  return testSet.map((testSetQuestion: Question) => {
    const randomInt = Math.floor(Math.random() * 2) // Only 0 or 1
    const selectedLang = randomInt === 0 ? LANG.EN : LANG.FI
    const question = testSetQuestion[selectedLang]
    const correctAnswer = testSetQuestion[LANG.EN] === question ? testSetQuestion[LANG.FI] : testSetQuestion[LANG.EN]

    return { question, correctAnswer }
  })
}

export const addQuestionId = (testSet: QuestionResultWithoutId[]) => {
  let id = 1
  return testSet.map((question: QuestionResultWithoutId) => {
    const wordSetWithId = {
      ...question,
      id
    }
    id++

    return wordSetWithId
  })
}

export const getCurrentQuestion = (testSet: QuestionResult[], currentQuestionId: number): QuestionResult =>
  find(testSet, matchesProperty('id', currentQuestionId))

export const designTestSet = (testSet: Question[], numberOfQuestion: number): QuestionResult[] => {
  const shuffledList = shuffle(testSet)
  const randomizeLangSelectionList = randomizeLangSelection(shuffledList)
  const testSetWithQuestionId = addQuestionId(randomizeLangSelectionList)

  return slice(testSetWithQuestionId, 0, numberOfQuestion)
}

export const updateTestResult = (
  testSet: QuestionResult[],
  currentQuestionId: number,
  userAnswer: string
): QuestionResult[] => {
  const correctAnswer = getCurrentQuestion(testSet, currentQuestionId).correctAnswer

  return testSet.map((questionResult: QuestionResult) => {
    if (questionResult.id !== currentQuestionId) return { ...questionResult }

    return {
      ...questionResult,
      userAnswer,
      isCorrect: isAnswerCorrect(userAnswer, correctAnswer)
    }
  })
}