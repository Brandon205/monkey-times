import { useState, useEffect } from "react";
import { msToTime } from "../lib/helper";

export default function Times(props) {
    const [times, setTimes] = useState([]);

    useEffect(() => {
        setTimes(props.storedTimes)
    }, [props.storedTimes, props.session]);

    const removeTime = (index) => {
        let tempTimes = times
        tempTimes.splice(index, 1)
        localStorage.setItem('monkeyTimes' + props.session, JSON.stringify(tempTimes))
        console.log("removing at index: " + index)

        props.updateTimes()
    }

    let content;
    if (times.length >= 1) {
        content = times.map((item, id) => {

            return (
                <div key={id} className='border-2 border-yellow-400 flex justify-between p-2'>
                    <p className="inline text-white text-xl">{id + 1}</p>
                    <p className="text-white inline text-xl">{msToTime(item.time)}</p>
                    <button className="inline mr-0 text-white text-lg" onClick={() => removeTime(id)}>X</button>
                </div>
            )
    })
    } else {
        content = <p className="text-white">No Stored times in this session</p>
    }

    return (
        <div className="w-[30vw]">
            <select name="session" id="session" onChange={(e) => props.setSession(e.target.value)} tabIndex='-1' className='p-2 bg-zinc-800 text-white text-lg w-fit'>
                <option value="1">Session 1</option>
                <option value="2">Session 2</option>
                <option value="3">Session 3</option>
                <option value="3">Sign in to add more!</option>
            </select>
            <div className="grid">
                {content}
            </div>
        </div>
    )
}
