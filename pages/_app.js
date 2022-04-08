import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default MyApp
