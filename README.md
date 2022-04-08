## 파이어베이스 호스팅 새로고침시 404

### firebase.json

```
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

```

## nextjs / firebase hosting

1. package.json

```
 "scripts": {
    ...
    "build": "next build && next export",
    ...
  }
```

out 폴더 ->

```
npm install -g firebase-tools

firebase login

firebase init

firebase deploy
```

## tailwind dark mode

1. tailwind.config.js

```
module.exports = {
  darkMode: 'class',
  ...
}
```

2. \_app.js

```
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
```

3. install 'next-themes'

```
import { useTheme } from 'next-themes'

export default function Top() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    ....

    <div onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon className="w-7 h-7" /> : <MoonIcon className="w-7 h-7" />}
    </div>
    ...
  )
}
```
