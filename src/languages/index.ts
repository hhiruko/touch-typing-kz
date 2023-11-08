export type ILanguage =
  | 'English'
  | 'Hindi'
  | 'Nepali'
  | 'Punjabi'
  | 'Bengali'
  | 'Tamil'
  | 'Urdu'
  | 'Santali';

export const languageList: ILanguage[] = [
  'English',
  'Hindi',
  'Nepali',
  'Punjabi',
  'Bengali',
  'Tamil',
  'Urdu',
  'Santali',
];

export const validateLanguage = (language: string): ILanguage => {
  if (languageList.includes(language as ILanguage)) {
    return language as ILanguage;
  }

  console.warn('Invalid language');
  return 'English';
};
