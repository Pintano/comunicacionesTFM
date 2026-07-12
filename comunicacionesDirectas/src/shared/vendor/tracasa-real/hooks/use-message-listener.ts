/**
 * @deprecated Esta función está obsoleta debido a que genera tantos canales como veces se llame a la función.
 *
 *             Esto produce que si aplicas esta función en un botón, generará tantos canales como veces se pulse y cuando se envíe un mensaje todos recibirán y ejecutarán la función a la vez.
 *
 *             Utiliza `useMessageStore` o `useBroadcastListener` en su lugar.
 */
export const messageListener = (funcion: () => void, tipoEvento: string) => {
  const channel = new BroadcastChannel('canalAngularReact');

  const messageHandler = (event: MessageEvent) => {
    if (event.data && event.data.type === tipoEvento) {
      funcion();
    }
  };

  channel.onmessage = messageHandler;

  return () => {
    channel.close();
  };
};
