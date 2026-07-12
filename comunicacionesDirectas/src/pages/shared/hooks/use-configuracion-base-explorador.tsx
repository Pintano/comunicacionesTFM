import { MaestrosHttpRepository } from "@/shared/repositories/maestros";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useConfiguracionBaseExplorador() {
  const {
    data: { menus, configuracion },
  } = useSuspenseQuery({
    queryKey: ["obtenerConfiguracionBaseExplorador"],
    queryFn: async () => {
      const [menus, configuracion] = await Promise.all([
        MaestrosHttpRepository().obtenerMenusExploradorPorOrganoYUsuario(),
        MaestrosHttpRepository().obtenerConfiguracionBaseExplorador(),
      ]);

      return { menus, configuracion };
    },
  });

  return { menus, configuracion };
}
