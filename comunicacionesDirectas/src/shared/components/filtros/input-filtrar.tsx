import { InputSearch } from 'tracasa-components';
import { useTranslation } from 'react-i18next';

type InputFiltrarProps = {
  filtro: string;
  onChange: (valor: string) => void;
  encapsulado?: boolean;
};

export default function InputFiltrar({
  filtro,
  onChange,
  encapsulado = false,
}: InputFiltrarProps) {
  const { t } = useTranslation();

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return encapsulado ? (
    <div>
      <InputSearch
        value={filtro}
        onChange={handleFiltroChange}
        placeholder={t('shared.filtro.filtrar')}
      />
    </div>
  ) : (
    <InputSearch
      value={filtro}
      onChange={handleFiltroChange}
      placeholder={t('shared.filtro.filtrar')}
    />
  );
}
