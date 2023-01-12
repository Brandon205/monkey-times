import { useState } from "react"

export default function Times() {
    const [times, setTimes] = useState([]);

    const getTimes = () => {
        if (user) {
            setTimes(getUserTimes())
        } else {
            setTimes(getGuestTimes())
        }
    }

    return (
        <div>
            <div className="grid">
                <div>00:28.648</div>
                <div>00:29.241</div>
                <div>00:24.268</div>
            </div>
        </div>
    )
}

const getUserTimes = (user, session) => {
    // Access DB to get all times from the current session
}

const getGuestTimes = (session) => {
    // Access SessionStorage using the current session to get all times and return an array of the times
} 
