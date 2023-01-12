import { useEffect, useState } from 'react';
import { randomScrambleForEvent } from 'cubing/scramble';

import { HiRefresh } from 'react-icons/hi';

export default function Home() {
  const [scramble, setScramble] = useState("");
  const [event, setEvent] = useState('222');

  useEffect( () => {
    generateScramble();
  }, [])

  let generateScramble = async () => {
    const scram = await randomScrambleForEvent(event);
    setScramble(scram.toString());
  }

  return (
    <div className="flex justify-center h-screen items-center">
      <h1 className="text-yellow-400 text-5xl">{scramble}</h1>
      <button onClick={generateScramble} className="p-5 text-white text-3xl"><HiRefresh /></button>
    </div>
  )
}
