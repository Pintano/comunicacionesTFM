// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { AyudaSoporte } from './aviso-minuta';
// import { IAyudaSoporteRepository } from '@/shared/repositories/ayuda-soporte';
// import { IConfiguracionDespliegueRepository } from '@/shared/repositories/configuracion-despliegue';
// import { AyudaSoporteInMemory } from '@/shared/repositories/ayuda-soporte';
// import { ConfiguracionDespliegueInMemory } from '@/shared/repositories/configuracion-despliegue';

// const mockRepositorioAyudaSoporte: IAyudaSoporteRepository = AyudaSoporteInMemory();
// const mockRepositorioConfiguracionDespliegue: IConfiguracionDespliegueRepository = ConfiguracionDespliegueInMemory();

// describe('AyudaSoporte', () => {
// 	it('se renderiza sin fallar', async () => {
// 		render(
// 			<AyudaSoporte
// 				repositorioAyudaSoporte={mockRepositorioAyudaSoporte}
// 				repositorioConfiguracionDespliegue={mockRepositorioConfiguracionDespliegue}
// 			/>
// 		);
// 		expect(screen.getByRole('button')).toBeInTheDocument();
// 	});

// 	it('muestra el botón de ayuda cuando no esta configurado y tiene acceso', async () => {
// 		render(
// 			<AyudaSoporte
// 				repositorioAyudaSoporte={mockRepositorioAyudaSoporte}
// 				repositorioConfiguracionDespliegue={mockRepositorioConfiguracionDespliegue}
// 			/>
// 		);
// 		await waitFor(() => expect(screen.getByRole('button')).toBeVisible());
// 	});

// 	it('guarda el objeto compartido en localStorage al hacer clic en el botón', async () => {
// 		render(
// 			<AyudaSoporte
// 				repositorioAyudaSoporte={mockRepositorioAyudaSoporte}
// 				repositorioConfiguracionDespliegue={mockRepositorioConfiguracionDespliegue}
// 			/>
// 		);

// 		const button = screen.getByRole('button');
// 		fireEvent.click(button);

// 		await waitFor(() => {
// 			const objetoCompartido = JSON.parse(localStorage.getItem('objetoCompartido') || '{}');
// 			expect(objetoCompartido).toHaveProperty('Ruta');
// 			expect(objetoCompartido).toHaveProperty('parametros');
// 			expect(objetoCompartido).toHaveProperty('urlParametrosSinSustituir');
// 		});
// 	});
// });
