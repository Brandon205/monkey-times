import { useContext, useEffect, useCallback, useState } from 'react';
import { firestore, auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { UserContext } from '../lib/context';
import debounce from 'lodash.debounce';

import { doc, writeBatch } from 'firebase/firestore';

export default function EnterPage( { } ) {
    const {user, username} = useContext(UserContext);
    
    // 1. user signed out <SignInButton />
    // 2. user signed in, but missing username <UsernameForm />
    // 3. user signed in, has username <SignOutButton />
    return (
        <main className='flex justify-center'>
            {user ? 
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider);
    }

    return (
        <button className='text-black btn bg-slate-800' onClick={signInWithGoogle}>
            <img className='w-[30px] mr-2' src={'/google.png'} alt="google logo" /> Sign in with Google
        </button>
    )
}

function SignOutButton() {
    return <button className='btn bg-slate-800' onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user, username} = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue)
    }, [formValue])

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
            debounce(async (username) => {
                if (username.length >= 3) {
                    const ref = doc(firestore, `usernames/${username}`);
                    const exists = ref.exists;
                    console.log('Firestore read executed!');
                    setIsValid(!exists);
                    setLoading(false)
                }
            }, 500),
        []
    )

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const userDoc = doc(firestore, `users/${user.uid}`);
        const usernameDoc = doc(firestore, `usernames/${formValue}`);

        const batch = writeBatch(firestore);
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName })
        batch.set(usernameDoc, { uid: user.uid })

        await batch.commit();
    }


    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username" value={formValue} onChange={onChange} className='inline-block outline-none border-none text-2xl w-full py-1 px-2' />

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

                    <button type="submit" className='bg-green-600 text-black btn' disabled={!isValid}>Choose</button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    )
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-green-600 font-bold">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-red-600 font-bold">That username is taken!</p>;
    } else {
        return <p></p>
    }
}

