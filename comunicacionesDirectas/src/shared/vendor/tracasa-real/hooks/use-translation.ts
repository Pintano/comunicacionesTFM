import { useCallback } from 'react';
import i18n from 'i18next';

const useComponentsTranslation = () => {
  const t = useCallback((key: string, sustitucion: string[] = []): string => {
    const translated = i18n.t(key);

    if (typeof translated === 'string' && translated.includes('{')) {
      return sustitucion.reduce(
        (acc, value, index) => acc.replace(`{${index}}`, value),
        translated,
      );
    }

    return typeof translated === 'string' && translated !== key ? translated : key;
  }, []);

  return { t };
};

export default useComponentsTranslation;
