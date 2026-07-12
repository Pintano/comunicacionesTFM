import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { broadcast } from '../hooks/broadcast-interno';

export default function Sync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    broadcast.onmessage = (event) => {
      const { type, queryKey } = event.data;

      if (type === 'invalidate' && queryKey) {
        queryClient.invalidateQueries({
          queryKey,
        });
      }
    };
  }, [queryClient]);

  return <></>;
}
