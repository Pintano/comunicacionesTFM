export const cabeceraPrincipalDocumentation = {
  title: 'CabeceraPrincipal',
  description:
    'Componente genérico de cabecera principal para aplicaciones. Proporciona un layout cohesivo con logo, título opcional, contenido flexible mediante children y slot de acciones. Este componente es agnóstico del negocio y puede ser usado por múltiples aplicaciones (Avantius, PSP, etc.).',

  whenToUse: [
    'Como cabecera principal de una aplicación con logo, título y acciones',
    'Cuando necesitas un layout consistente pero con contenido flexible',
    'Para aplicaciones que requieren composición de elementos en la cabecera',
    'Cuando el contenido central varía entre diferentes páginas o aplicaciones',
    'Para mantener coherencia visual entre múltiples productos',
  ],

  whenNotToUse: [
    'Para cabeceras de secciones internas (usar HeaderSearch o componentes específicos)',
    'Si necesitas un layout completamente custom sin restricciones',
    'Para cabeceras simples con solo texto (usar elementos HTML nativos)',
    'Cuando el diseño no sigue el patrón logo-contenido-acciones',
  ],

  keyAdvantage:
    'Proporciona un layout consistente y accesible con separación clara entre logo/título (left), contenido flexible (center) y acciones (right), mientras mantiene la flexibilidad mediante composición con children.',

  codeExamples: {
    Básico: `<CabeceraPrincipal
  logoProps={{ url: '/logo.svg' }}
>
  <InputSearch placeholder="Buscar..." />
</CabeceraPrincipal>`,

    'Con título y subtítulo': `<CabeceraPrincipal
  logoProps={{ url: '/logo.svg' }}
  title="Sistema de Justicia"
  subtitle="Departamento de Registro"
>
  <InputSearch placeholder="Buscar documentos..." />
</CabeceraPrincipal>`,

    'Con acciones': `<CabeceraPrincipal
  logoProps={{ url: '/logo.svg' }}
  accionesSlot={
    <>
      <IconButtonShape
        icon="bell"
        shape="circle"
        onClick={handleNotifications}
        aria-label="Notificaciones"
      />
      <IconButtonShape
        icon="user"
        shape="circle"
        onClick={handleProfile}
        aria-label="Perfil"
      />
    </>
  }
>
  <InputSearch placeholder="Buscar..." />
</CabeceraPrincipal>`,

    'Composición compleja (Avantius-like)': `<CabeceraPrincipal
  logoProps={{ url: logoAvantius }}
  title="Avantius"
  accionesSlot={
    <>
      <BuscadorMenus tabList={menusConfig} />
      <IndicadorNotificaciones notificaciones={5} />
      <button onClick={openProfile}>
        <IconWrapper icono="menuCabecera" />
      </button>
    </>
  }
>
  <BusquedaRapida />
</CabeceraPrincipal>`,

    'Estilo PSP (Logo + Título + Botón perfil)': `<CabeceraPrincipal
  logoProps={{ children: <LogoComunidad /> }}
  title="Portal de Pagos"
  accionesSlot={
    <button onClick={toggleProfile}>
      <IconWrapper icono="menuCabecera" size="xl" />
    </button>
  }
/>`,

    'Logo como children (custom)': `<CabeceraPrincipal
  logoProps={{
    children: (
      <div style={{ width: 220, height: 48 }}>
        <img src={logo} alt="Logo" />
      </div>
    ),
  }}
>
  <div>Contenido personalizado</div>
</CabeceraPrincipal>`,

    Minimalista: `<CabeceraPrincipal
  logoProps={{ url: '/logo.svg' }}
  title="Mi Aplicación"
/>`,
  },
};
