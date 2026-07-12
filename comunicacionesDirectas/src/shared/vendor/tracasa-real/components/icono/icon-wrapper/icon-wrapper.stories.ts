import type { Meta, StoryObj } from '@storybook/react-vite';
import type { IconWrapperProps } from './icon-wrapper';
import { IconWrapper } from './icon-wrapper';
import type { IconName } from './icon-definitions';
import { iconComponents } from './icon-definitions';

const meta: Meta<IconWrapperProps> = {
  title: 'Componentes/Icono/IconoWrapper',
  component: IconWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<IconWrapperProps>;

const iconStories: Record<string, Story> = {};

Object.keys(iconComponents).forEach((iconName) => {
  iconStories[iconName] = {
    args: {
      icono: iconName as IconName,
      size: 'lg',
    },
  };
});

export const ChevronUp = iconStories.chevronUp;
export const Search = iconStories.search;
export const Close = iconStories.close;
export const Folder = iconStories.folder;
export const Home = iconStories.home;
export const ArrowRight = iconStories.arrowRight;
export const ButtonDropdownUp = iconStories.buttonDropdownUp;
export const ButtonDropdownDown = iconStories.buttonDropdownDown;
export const Menus = iconStories.menus;
export const Check = iconStories.check;
export const Campana = iconStories.campana;
export const Info = iconStories.info;
export const Warning = iconStories.warning;
export const Error = iconStories.error;
export const ArrowUpDown = iconStories.arrowUpDown;
export const Filtros = iconStories.filtros;
export const ThreeDotsVertical = iconStories.threeDotsVertical;
export const ChevronRight = iconStories.chevronRight;
export const ChevronDown = iconStories.chevronDown;
export const ChevronLeftDouble = iconStories.chevronLeftDouble;
export const ChevronLeft = iconStories.chevronLeft;
export const ChevronRightDouble = iconStories.chevronRightDouble;
export const BolitaAcciones = iconStories.bolitaAcciones;
export const IconoExpedienteIndicador = iconStories.expedienteIndicador;
export const BrandCitymapper = iconStories.brandCitymapper;
export const Refresh = iconStories.refresh;
export const Reorder = iconStories.reorder;
export const ArrowsRightLeft = iconStories.arrowsRightLeft;
export const UserCode = iconStories.userCode;
export const Messages = iconStories.messages;
export const MailForward = iconStories.mailForward;
export const FileBroken = iconStories.fileBroken;
export const File = iconStories.file;
export const FilePlus = iconStories.filePlus;
export const FileDots = iconStories.fileDots;
export const CalendarExclamation = iconStories.calendarExclamation;
export const EyeX = iconStories.eyeX;
export const Album = iconStories.album;
export const LayoutGridRemove = iconStories.layoutGridRemove;
export const BoxAlignLeft = iconStories.boxAlignLeft;
export const BlendMode = iconStories.blendMode;
export const BrowserPlus = iconStories.browserPlus;
export const CirclePlus = iconStories.circlePlus;
export const ViewportWide = iconStories.viewportWide;
export const Menu2 = iconStories.menu2;
export const UserCog = iconStories.userCog;
export const IconoAuxilios = iconStories.auxilios;
export const RemitidoSecretoSumarial = iconStories.remitidoSecretoSumarial;
