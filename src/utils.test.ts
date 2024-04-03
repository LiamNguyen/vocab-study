import { isAnswerCorrect } from './utils'

describe('isAnswerCorrect function', () => {
  it('should return true for exact match', () => {
    const userAnswer = 'hello'
    const correctAnswer = 'hello'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(true)
  })

  it('should return true for 70% match', () => {
    const userAnswer = 'that apple pie'
    const correctAnswer = 'this apple pie'
    const secondUserAnswer = 'uutise'
    const secondCorrectAnswer = 'uutiset'
    // expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(true)
    expect(isAnswerCorrect(secondUserAnswer, secondCorrectAnswer)).toBe(true)
  })

  it('should return false for less than 70% match', () => {
    const userAnswer = 'that apple pie'
    const correctAnswer = 'this apple pies'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(false)
  })

  it('should ignore case sensitivity', () => {
    const userAnswer = 'HELLO world'
    const correctAnswer = 'hello WORLD'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(true)
  })

  it('should ignore leading and trailing spaces', () => {
    const userAnswer = '  hello  '
    const correctAnswer = 'hello'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(true)
  })

  it('should return false for empty user answer', () => {
    const userAnswer = ''
    const correctAnswer = 'hello'
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(false)
  })

  it('should return false for empty correct answer', () => {
    const userAnswer = 'hello'
    const correctAnswer = ''
    expect(isAnswerCorrect(userAnswer, correctAnswer)).toBe(false)
  })
})
