import UserProfile from '../../components/UserProfile';
import { getUserWithUsername } from '../../lib/firebase';

// export async function getServerSideProps({ query }) { // SSR Rendering (for getting updated information when a page is requested to load)
//     const { username } = query;
//     console.log('HGELJGOSJNGON', username)

//     const userDoc = await getUserWithUsername(username);

//     // If no user, short circuit to 404 page
//     if (!userDoc) {
//         return {
//             notFound: true,
//         };
//     }

//     let user = null;

//     return {
//         props: { user }, // Will be passed to the page component below as props
//     }
// }

export default function AdminPostsPage({ user }) {
    return (
        <main>
            <UserProfile user={user} />
        </main>
    )
}
