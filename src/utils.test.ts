import { Question, QuestionResultWithoutId } from './types'
import { addQuestionId, isAnswerCorrect } from './utils'

describe('isAnswerCorrect function', () => {
  it('should return true for exact match', () => {
    const userAnswer = 'hello'
    const correctAnswer = 'hello'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeTruthy()
  })

  it('should return true for 70% match', () => {
    const userAnswer = 'that apple pie'
    const correctAnswer = 'this apple pie'
    const secondUserAnswer = 'uutise'
    const secondCorrectAnswer = 'uutiset'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeTruthy()
    expect(isAnswerCorrect(secondUserAnswer, secondCorrectAnswer)).toBeTruthy()
  })

  it('should return true for 2/3 chars match', () => {
    const userAnswer = 'ei'
    const correctAnswer = 'ei.'

    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeTruthy()
  })

  it('should return false for less than 70% match', () => {
    const userAnswer = 'that apple pie'
    const correctAnswer = 'this apple pies'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeFalsy()
  })

  it('should ignore case sensitivity', () => {
    const userAnswer = 'HELLO world'
    const correctAnswer = 'hello WORLD'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeTruthy()
  })

  it('should ignore leading and trailing spaces', () => {
    const userAnswer = '  hello  '
    const correctAnswer = 'hello'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeTruthy()
  })

  it('should return false for empty user answer', () => {
    const userAnswer = ''
    const correctAnswer = 'hello'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeFalsy()
  })

  it('should return false for empty correct answer', () => {
    const userAnswer = 'hello'
    const correctAnswer = ''
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBeFalsy()
  })
})

test('addQuestionId', () => {
  const mockWordList: QuestionResultWithoutId[] = [
    { question: "Hei", correctAnswer: "Hello" },
    { question: "ja", correctAnswer: "and" },
    { question: "Tervetuloa!", correctAnswer: "Welcome!" },
    { question: "Moi!", correctAnswer: "Hi!" },
    { question: "Anteeksi!", correctAnswer: "Excuse me!" },
    { question: "onko", correctAnswer: "is" },
    { question: "täällä", correctAnswer: "here" }
  ]
  const wordListWithId = addQuestionId(mockWordList)

  expect(wordListWithId[0].id).toEqual(1)
  expect(wordListWithId[5].id).toEqual(6)
})