import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../../context/AuthContext'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider forcedTheme='light'>
      <Toaster />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
