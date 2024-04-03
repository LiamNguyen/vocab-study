import { checkAnswer } from './utils'

describe('checkAnswer function', () => {
  it('should return true for exact match', () => {
    const userAnswer = 'hello'
    const correctAnswer = 'hello'
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(true)
  })

  it('should return true for 70% match', () => {
    const userAnswer = 'that apple pie'
    const correctAnswer = 'this apple pie'
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(true)
  })

  it('should return false for less than 70% match', () => {
    const userAnswer = 'that apple pie'
    const correctAnswer = 'this apple pies'
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(false)
  })

  it('should ignore case sensitivity', () => {
    const userAnswer = 'HELLO world'
    const correctAnswer = 'hello WORLD'
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(true)
  })

  it('should ignore leading and trailing spaces', () => {
    const userAnswer = '  hello  '
    const correctAnswer = 'hello'
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(true)
  })

  it('should return false for empty user answer', () => {
    const userAnswer = ''
    const correctAnswer = 'hello'
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(false)
  })

  it('should return false for empty correct answer', () => {
    const userAnswer = 'hello'
    const correctAnswer = ''
    expect(checkAnswer(userAnswer, correctAnswer)).toBe(false)
  })
})
