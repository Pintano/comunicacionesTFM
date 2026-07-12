import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../base/button/button';
import { Modal } from '../modal/modal';
import { IconWrapper } from '../icono/icon-wrapper/icon-wrapper';
import type { GrupoExpedientes } from './arbol-relacionados';
import { ArbolRelacionados } from './arbol-relacionados';

const meta: Meta<typeof ArbolRelacionados> = {
  title: 'Componentes/Otros/ArbolRelacionados',
  component: ArbolRelacionados,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArbolRelacionados>;

const expedientesEjemplo: GrupoExpedientes[] = [
  {
    id: 1,
    nombreOrgano: 'AP. Secc1° (Civil) - Araba/Álava (Vitoria-Gasteiz)',
    expedientes: [
      {
        titulo: 'ABI 0060824/2021 01',
        sinPermiso: true,
        descripcionExpedienteArbol: 'Descripción del expediente',
        idObjetoEncriptado: 'idObjetoEncriptado',
        activo: true,
        onClick: () => {},
        subExpedientes: [
          {
            titulo: 'ABI 0060824/2021 02',
            sinPermiso: false,
            descripcionExpedienteArbol: 'Descripción del expediente',
            idObjetoEncriptado: 'idObjetoEncriptado',
            activo: false,
            onClick: () => {},
          },
        ],
      },
      {
        titulo: 'ABI 0060825/2021 00',
        sinPermiso: false,
        descripcionExpedienteArbol: 'Descripción del expediente',
        idObjetoEncriptado: 'idObjetoEncriptado',
        activo: false,
        onClick: () => {},
        subExpedientes: [
          {
            titulo: 'ABI 0060825/2021 01',
            sinPermiso: false,
            descripcionExpedienteArbol: 'Descripción del expediente',
            idObjetoEncriptado: 'idObjetoEncriptado',
            activo: false,
            onClick: () => {},
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nombreOrgano: 'AP. Secc1° (Civil) - Araba/Álava (Vitoria-Gasteiz)',
    expedientes: [
      {
        titulo: 'RQE 0060171/2024 00',
        sinPermiso: true,
        descripcionExpedienteArbol: 'Descripción del expediente',
        idObjetoEncriptado: 'idObjetoEncriptado',
        activo: false,
        onClick: () => {},
      },
    ],
  },
];

export const Predeterminado: Story = {
  args: { expedientesOrgano: expedientesEjemplo },
};

export const EnModal: Story = {
  args: { expedientesOrgano: expedientesEjemplo },
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false);
      const handleClose = () => {
        setIsOpen(false);
      };
      const handleOpen = () => {
        setIsOpen(true);
      };

      return (
        <>
          <Button
            onClick={handleOpen}
            size="icon-xl"
            style={{ borderRadius: '9999px' }}
            title="Árbol de relacionados"
          >
            <IconWrapper icono="binaryTree" size="lg" stroke={1} />
          </Button>
          <Modal isOpen={isOpen} onClose={handleClose}>
            <Modal.Header>Expedientes relacionados</Modal.Header>
            <Modal.Body>
              <Story />
            </Modal.Body>
          </Modal>
        </>
      );
    },
  ],
};
