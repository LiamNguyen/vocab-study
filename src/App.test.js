import { addQuestionId } from './App';

test('addQuestionId', () => {
  const mockWordList = [
    { fi: "Hei", en: "Hello" },
    { fi: "ja", en: "and" },
    { fi: "Tervetuloa!", en: "Welcome!" },
    { fi: "Moi!", en: "Hi!" },
    { fi: "Anteeksi!", en: "Excuse me!" },
    { fi: "onko", en: "is" },
    { fi: "täällä", en: "here" }
  ]
  const wordListWithId = addQuestionId(mockWordList)

  expect(wordListWithId[0].id).toEqual(1)
  expect(wordListWithId[5].id).toEqual(6)
})