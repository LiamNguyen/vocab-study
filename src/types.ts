export enum LANG {
  EN = 'en',
  FI = 'fi'
}

export interface UnrefinedQuestion {
  fi: string,
  en: string,
}

export interface Question extends UnrefinedQuestion {
  id: number,
  selectedLang: LANG
}