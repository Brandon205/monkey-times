import { useEffect, useState } from 'react';
import { randomScrambleForEvent } from 'cubing/scramble';
import { getUserTimes, getGuestTimes } from '../lib/helper';

import TimerComponent from '../components/TimerComponent';
import Loader from '../components/Loader';
import Times from '../components/Times';
import ScrambleComponent from '../components/ScrambleComponent';

export default function Home(props) {
  const [scramble, setScramble] = useState("");
  const [lastScramble, setLastScramble] = useState("");
  const [event, setEvent] = useState('222');
  const [loading, setLoading] = useState(false);

  // State for the <Times /> component
  const [session, setSession] = useState('1');
  const [storedTimes, setStoredTimes] = useState([]);

  useEffect( () => {
    generateScramble();
    if (props.user) {
      setStoredTimes(getUserTimes())
    } else {
      setStoredTimes(getGuestTimes(session))
    }
  }, [])

  const generateScramble = async (newEvent) => {
    setLoading(false)
    let currEvent = newEvent ? newEvent : event;

    const scram = await randomScrambleForEvent(currEvent);
    setLastScramble(scramble);
    setScramble(scram.toString());
    setLoading(false);
  }

  const handleEventChange = (e) => {
    e.preventDefault();

    setEvent(e.target.value);
    setLastScramble("")
    generateScramble(e.target.value);
  }

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-10">
      <Times user={null} session={session} setSession={setSession} storedTimes={storedTimes} />
      <select name="event" id="event" onChange={(e) => handleEventChange(e)} tabIndex='-1'>
        <option value="222">2x2x2</option>
        <option value="333">3x3x3</option>
        <option value="444">4x4x4</option>
        <option value="555">5x5x5</option>
        <option value="666">6x6x6</option>
        <option value="777">7x7x7</option>
      </select>
      <Loader show={loading} />
      <ScrambleComponent scramble={scramble} lastScramble={lastScramble} generateScramble={generateScramble} setScramble={setScramble} />
      <TimerComponent scramble={scramble} generateScramble={generateScramble} session={session} />
    </div>
  )
}
