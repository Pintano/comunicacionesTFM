import { Routes } from "@/shared/config/routing";
import { useNavigate } from "react-router-dom";
import { useMenusSidebarStore } from "../stores/menus-sidebar.store";
import { MenuSideBarEnum } from "@/shared/models/enums/menus-sidebar-enum";
import { useConfiguracionBaseExplorador } from "./use-configuracion-base-explorador";

export const useRedireccionExplorador = () => {
  const { menus, configuracion } = useConfiguracionBaseExplorador();

  const navigate = useNavigate();
  const setMostrarComunicacionesDirectas = useMenusSidebarStore(
    (state) => state.setMostrarComunicacionesDirectas,
  );

  if (configuracion) {
    setMostrarComunicacionesDirectas(
      configuracion.mostrarComunicacionesDirectas,
    );
  }

  const rutas: Record<string, string> = {
    cuadroMando:
      Routes.exploradorVictorinox.absolutePath + "/victorinox/cuadroMando",
    expedientes: Routes.exploradorExpedientes.absolutePath,
    agenda: Routes.exploradorAgenda.absolutePath,
    asuntos: Routes.exploradorAsuntos.absolutePath,
    asuntosPendientes: Routes.exploradorAsuntosPendientes.absolutePath,
  };

  const idClaveMenu: Record<number, string> = {
    [MenuSideBarEnum.CuadroMando]: "cuadroMando",
    [MenuSideBarEnum.Expedientes]: "expedientes",
    [MenuSideBarEnum.Asuntos]: "asuntos",
    [MenuSideBarEnum.AsuntosPendientes]: "asuntosPendientes",
    [MenuSideBarEnum.Agenda]: "agenda",
  };

  const tiposRutaDisponibles = menus.menus
    .map((menu) => idClaveMenu[menu.idMenuExplorador])
    .filter((tipoRuta) => !!tipoRuta && !!rutas[tipoRuta]);

  const rutaConfigurada = configuracion.paginaInicialExplorador;
  const rutaConfiguradaDisponible = tiposRutaDisponibles.includes(
    rutaConfigurada,
  )
    ? rutas[rutaConfigurada]
    : undefined;

  const rutaPorDefecto = tiposRutaDisponibles[0]
    ? rutas[tiposRutaDisponibles[0]]
    : undefined;

  return (replace: boolean) => {
    navigate(
      rutaConfiguradaDisponible ??
        rutaPorDefecto ??
        rutas.expedientes,
      {
        replace: replace,
        state: {
          ocultarCabecera: true,
        },
      },
    );
  };
};
