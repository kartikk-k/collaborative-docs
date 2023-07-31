import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../../context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider forcedTheme='light'>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
