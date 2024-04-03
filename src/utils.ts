export const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
  // Convert both answers to lowercase for case insensitivity
  userAnswer = userAnswer.toLowerCase().trim()
  correctAnswer = correctAnswer.toLowerCase().trim()

  if (userAnswer === correctAnswer) return true

  // Calculate the minimum required matching characters count
  const minMatchingChars = Math.ceil(correctAnswer.length * 0.7)

  let matchingChars = 0
  let longestMatch = 0
  let currentMatch = 0

  for (let i = 0; i < userAnswer.length; i++) {
    // If the current character in user's answer matches the character in correct answer
    if (correctAnswer.indexOf(userAnswer[i]) > currentMatch || correctAnswer.indexOf(userAnswer[i]) > 0) {
      matchingChars++
      currentMatch++
      // If the current match length is the longest, update the longestMatch variable
      if (currentMatch > longestMatch) {
        longestMatch = currentMatch
      }

      // If the matching characters count is equal to or greater than the required count, return true
      if (matchingChars >= minMatchingChars) {
        return true
      }
    } else {
      // If there's no match, reset the current match count
      currentMatch = 0
      // Reset the matching characters count to start matching from the beginning of correct answer again
      matchingChars = 0
    }
  }
  // If the loop completes without returning true, return false
  return false
}