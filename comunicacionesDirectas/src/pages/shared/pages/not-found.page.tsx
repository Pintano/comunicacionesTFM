import { useTranslation } from 'react-i18next';

export default function PageNotFound() {
  const { t } = useTranslation();

  return <h1>{t('page.not-found.title')}</h1>;
}
