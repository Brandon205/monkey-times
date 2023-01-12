import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-zinc-700">

      <Component {...pageProps} />
    </div>
  )
}
