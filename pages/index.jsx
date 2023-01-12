import { useEffect, useState } from 'react';
import { randomScrambleForEvent } from 'cubing/scramble';

import { HiRefresh } from 'react-icons/hi';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center">
      <ScrambleComponent />
    </div>
  )
}

const ScrambleComponent = () => {
  const [scramble, setScramble] = useState("");
  const [lastScramble, setLastScramble] = useState("");
  const [event, setEvent] = useState('222');

  useEffect( () => {
    generateScramble();
  }, [])

  let generateScramble = async () => {
    const scram = await randomScrambleForEvent(event);
    setLastScramble(scramble)
    setScramble(scram.toString());
  }

 return (
  <div className='flex items-center flex-col'>
    <h1 className="text-yellow-400 text-5xl">{scramble}</h1>
    <div>
      <button title='Last Scramble' onClick={() => setScramble(lastScramble)} className="p-5 text-white text-3xl"><MdOutlineArrowBack /></button>
      <button title='New Scramble' onClick={generateScramble} className="p-5 text-white text-3xl"><HiRefresh /></button>
    </div>
  </div>
 )
}
