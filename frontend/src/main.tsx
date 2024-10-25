import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { SearchContextComponent } from './context/SearchContext';
import App from './App.tsx'
import './index.css'

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SearchContextComponent>
          <App />
        </SearchContextComponent>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
)
