import { useState, useEffect } from "react";
import { msToTime } from "../lib/helper";

export default function Times(props) {
    const [times, setTimes] = useState([]);

    useEffect(() => {
        setTimes(props.storedTimes)
    }, [props.storedTimes, props.session]);

    console.log("TIMES: ", times)
    let content;
    if (times.length >= 1) {
        content = times.map((item, id) => {
            console.log(item)

            return (
                <div key={id}>
                    <p className="text-white inline">{msToTime(item.time)} </p>
                    <p className="inline text-gray">{item.scramble}</p>
                </div>
            )
    })
    } else {
        content = <p className="text-white">No Stored times in this session</p>
    }

    return (
        <div>
            <select name="session" id="session" onChange={(e) => props.setSession(e.target.value)} tabIndex='-1'>
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
