import { useState, useCallback } from 'react';
import { useTimer } from 'react-use-precision-timer';

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
        // TODO: Database call to store the new time
        props.generateScramble();
    }

    return (
        <div className='flex flex-col gap-8 items-center'>
            <h2 className='text-white text-8xl'>{time}</h2>
            <div className="flex gap-4">
                {running ? 
                    <button onClick={() => stop()} className='p-3 text-white rounded-md bg-zinc-800'>Pause Stopwatch</button> : 
                    <button onClick={() => start()} className='p-3 text-white rounded-md bg-zinc-800'>Start Stopwatch</button>
                }
            </div>
        </div>
    )
}

function msToTime(s) {

    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }
  
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
  
    return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}

function msToTimeSlow(s) {

    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }
  
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
  
    return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 1);
}