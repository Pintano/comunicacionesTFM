import fs from 'fs';
import path from 'path';

let hasWarnings = false;

function getAllKeys(obj: any) {
  let keys: string[] = [];
  for (const key in obj) {
    keys.push(key);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key]));
    }
  }
  return keys;
}

function checkTranslations(translations: any, lang: string) {
  for (const key in translations) {
    const translation = translations[key];

    if (typeof translation === 'string') {
      if (translation.includes('CA_') || translation.includes('EU_')) {
        console.log(
          `##vso[task.logissue type=warning]WarningTranslations: La Key "${key}" en el idioma "${lang}" tiene una traduccion pendiente: "${translation}".`,
        );
        hasWarnings = true;
      }
    } else if (typeof translation === 'object' && translation !== null) {
      checkTranslations(translation, lang);
    }
  }
}

describe('use-translations translation keys', () => {
  const languages = ['es', 'eu', 'ca'];

  it('should have the same keys in all translation files', () => {
    const keySets: { [key: string]: Set<string> } = {};

    languages.forEach((lang) => {
      const filePath = path.resolve(
        __dirname,
        `../assets/locales/${lang}.json`,
      );
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const translations = JSON.parse(fileContent);
      const keys = getAllKeys(translations);

      checkTranslations(translations, lang);

      keySets[lang] = new Set(keys);
    });

    const firstLangKeys = keySets[languages[0]];
    languages.slice(1).forEach((lang) => {
      const currentLangKeys = keySets[lang];
      expect(currentLangKeys).toEqual(firstLangKeys);
    });

    if (hasWarnings) {
      console.log('##vso[task.complete result=SucceededWithIssues]');
    }
  });
});
