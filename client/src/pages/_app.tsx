import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../../context/AuthContext'
import { ToastProvider } from '../components/ui/toaster'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider forcedTheme='light'>
      <AuthProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
