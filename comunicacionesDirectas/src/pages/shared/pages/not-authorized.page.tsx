import { useTranslation } from 'react-i18next';

export const PageNotAuthorized = () => {
  const { t } = useTranslation();

  return <h1>{t('page.not-authorized.title')}</h1>;
};
