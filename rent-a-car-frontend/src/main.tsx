import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 1. REACT QUERY İÇİN GEREKLİ ALETLERİ İÇERİ ALIYORUZ
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. HAFIZA DEPOSUNU (CACHE) OLUŞTURUYORUZ
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Sekme değiştirdiğinde gereksiz yere backend'i yormasın
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* 3. TÜM PROJEYİ (App) BU DEPOYLA SARMALIYORUZ */}
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
)