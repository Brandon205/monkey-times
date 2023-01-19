import { auth } from '../lib/firebase';
import { collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const ref = collection('users').doc(user.uid);
            unsubscribe = ref.onSnapshot((doc) => {
                setUsername(doc.data()?.username);
            })
        } else {
            setUsername(null)
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}