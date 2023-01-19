import { firestore, auth } from '../lib/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            // const ref = collection(firestore, `users`).doc(firestore, user.uid);
            const ref = doc(firestore, `users/${user.uid}`)
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username);
            })
        } else {
            setUsername(null)
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}