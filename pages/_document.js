import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <body className="bg-primary dark:bg-primary2">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
