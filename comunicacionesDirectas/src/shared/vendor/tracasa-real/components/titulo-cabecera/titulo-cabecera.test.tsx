import { TituloCabecera } from './titulo-cabecera';
import { render } from '@testing-library/react';

describe('Titulo Cabecera', () => {
  it('debería renderizarse sin fallar', () => {
    const titulo = 'Título de ejemplo';
    const { getByText } = render(<TituloCabecera>{titulo}</TituloCabecera>);

    const tituloCabecera = getByText(titulo);

    expect(tituloCabecera).toBeInTheDocument();
  });
});
