import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function Navbar() {
    const {user, username} = useContext(UserContext);

    const router = useRouter();

    const signOut =  () => {
        auth.signOut();
        router.reload();
    }

    return (
        <nav className="w-screen h-[70px] bg-zinc-600 text-white fixed top-0 pt-0 px-[10vw] font-bold border-b-gray-600 border-b-2 z-40">
            <ul className='list-none m-0 p-0 flex items-center justify-between h-full'>
                <li>
                    <Link href="/">
                        <button className='btn-logo'>CubeX</button>
                    </Link>
                </li>

                {/* user is signed in and has username */}
                {username && (
                    <>
                        <li className='ml-auto mr-2'>
                            <button onClick={signOut}>Sign Out</button>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img className='rounded-2xl w-[50px] h-[50px] cursor-pointer' src={user?.photoURL || './hacker.png'} />
                            </Link>
                        </li>
                    </>
                )}

                {/* user is not signed in OR has not created username */}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className='btn-blue'>Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}