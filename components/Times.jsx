import { useState, useEffect } from "react";
import { msToTime } from "../lib/helper";

export default function Times(props) {
    const [times, setTimes] = useState([]);

    useEffect(() => {
        setTimes(props.storedTimes)
    }, [props.storedTimes, props.session]);

    let content;
    if (times.length >= 1) {
        content = times.map((item, id) => {
            console.log(item)

            return (
                <div key={id}>
                    <p className="text-white inline text-xl">{msToTime(item.time)}</p>
                </div>
            )
    })
    } else {
        content = <p className="text-white">No Stored times in this session</p>
    }

    return (
        <div className="w-[30vw]">
            <select name="session" id="session" onChange={(e) => props.setSession(e.target.value)} tabIndex='-1' className='p-2 bg-zinc-800 text-white text-lg'>
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
