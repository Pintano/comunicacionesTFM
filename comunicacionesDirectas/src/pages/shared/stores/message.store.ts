/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export interface CanalEvento {
  tipoEvento: string;
  canal?: BroadcastChannel;
}

export interface RecibirMensaje {
  tipoEvento: string;
  funcion: (data?: any) => void;
  canal?: BroadcastChannel;
}

interface MessageStore {
  arrayEventos: CanalEvento[];
  recibirMensaje: (msg: RecibirMensaje) => void;
}

export const useMessageStore = create<MessageStore>()((set, get) => ({
  arrayEventos: [],
  recibirMensaje: (msg: RecibirMensaje) => {
    const { arrayEventos } = get();

    const eventoActual = arrayEventos.find(
      (evento) => evento.tipoEvento === msg.tipoEvento,
    );

    if (eventoActual?.canal) {
      eventoActual.canal.close();
    }

    const channel = new BroadcastChannel('canalAngularReact');

    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === msg.tipoEvento) {
        msg.funcion(event.data.payload);
      }
    };

    channel.onmessage = messageHandler;

    const nuevosEventos = [
      ...arrayEventos.filter((e) => e.tipoEvento !== msg.tipoEvento),
      { ...msg, canal: channel },
    ];

    set({ arrayEventos: nuevosEventos });
  },
}));
