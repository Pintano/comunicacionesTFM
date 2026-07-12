import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import '@/shared/config/i18n'
import { AvisosProvider } from '@/shared/providers/avisos-provider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AvisosProvider>
        <App />
      </AvisosProvider>
    </QueryClientProvider>
  </StrictMode>,
)
