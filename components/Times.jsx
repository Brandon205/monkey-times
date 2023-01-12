import { useState, useEffect } from "react"

export default function Times(props) {
    const [times, setTimes] = useState([]);

    useEffect(() => {
        setTimes(props.storedTimes)
    }, [props.storedTimes]);

    console.log("TIMES: ", times)
    let content;
    if (times) {
        content = times.map((time) => {
            <p>{time}</p>
    })
    } else {
        content = <p className="text-white">No Stored times in this session</p>
    }

    return (
        <div>
            <select name="session" id="session" onChange={(e) => props.setSession(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">Sign in to add more!</option>
            </select>
            <div className="grid">
                {content}
            </div>
        </div>
    )
}
