import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

export default function App({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <div className="bg-zinc-700 min-h-screen">
        <Component {...pageProps} />
        <Toaster />
      </div>
    </UserContext.Provider>
  )
}
