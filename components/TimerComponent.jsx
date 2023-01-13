import { useState, useCallback } from 'react';
import { useTimer } from 'react-use-precision-timer';
import { msToTime, msToTimeSlow } from '../lib/helper';

export default function TimerComponent(props) {
    const [time, setTime] = useState('00:00.000');
    const [running, setRunning] = useState(false);

    const callback = useCallback(() => setTime(msToTimeSlow(stopwatch.getElapsedRunningTime())), []);
    const stopwatch = useTimer({delay: 100}, callback);

    const start = () => {
        stopwatch.start();
        setRunning(true)
    }

    const stop = () => {
        stopwatch.pause()
        setRunning(false)
        setTime(msToTime(stopwatch.getElapsedRunningTime()))
        if (props.user) {
            // TODO: use the db to store times
        } else {
            // no user so store times in LS
            props.addNewTime(stopwatch.getElapsedRunningTime())
        }
        props.generateScramble();
    }

    return (
        <div className='flex flex-col gap-8 items-center'>
            <h2 className='text-white text-8xl'>{time}</h2>
            <div className="flex gap-4">
                {running ? 
                    <button onClick={() => stop()} className='p-3 text-white rounded-md bg-zinc-800' type='button' autofocus>Pause Stopwatch</button> : 
                    <button onClick={() => start()} className='p-3 text-white rounded-md bg-zinc-800' type='button' autofocus>Start Stopwatch</button>
                }
            </div>
        </div>
    )
}
