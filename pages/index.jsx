import { useEffect, useState } from 'react';
import { randomScrambleForEvent } from 'cubing/scramble';

import { HiRefresh } from 'react-icons/hi';
import { MdOutlineArrowBack } from 'react-icons/md';

import TimerComponent from '../components/TimerComponent';

export default function Home() {
  const [scramble, setScramble] = useState("");
  const [lastScramble, setLastScramble] = useState("");
  const [event, setEvent] = useState('333');

  useEffect( () => {
    generateScramble();
  }, [])

  const generateScramble = async (newEvent) => {
    let currEvent = newEvent ? newEvent : event

    const scram = await randomScrambleForEvent(currEvent);
    setLastScramble(scramble)
    setScramble(scram.toString());
  }

  const handleEventChange = (e) => {
    e.preventDefault();

    setEvent(e.target.value)
    generateScramble(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-10">
      <select name="event" id="event" onChange={(e) => handleEventChange(e)} defaultValue={event}>
        <option value="222">2x2x2</option>
        <option value="333">3x3x3</option>
        <option value="444">4x4x4</option>
        <option value="555">5x5x5</option>
        <option value="666">6x6x6</option>
        <option value="777">7x7x7</option>
      </select>
      <ScrambleComponent scramble={scramble} lastScramble={lastScramble} generateScramble={generateScramble} />
      <TimerComponent scramble={scramble} generateScramble={generateScramble} />
    </div>
  )
}

const ScrambleComponent = (props) => {

 return (
  <div className='flex items-center flex-col'>
    <h1 className="text-yellow-400 text-5xl">{props.scramble}</h1>
    <div>
      <button title='Last Scramble' onClick={() => props.setScramble(props.lastScramble)} className="p-5 text-white text-3xl"><MdOutlineArrowBack /></button>
      <button title='New Scramble' onClick={props.generateScramble} className="p-5 text-white text-3xl"><HiRefresh /></button>
    </div>
  </div>
 )
}
