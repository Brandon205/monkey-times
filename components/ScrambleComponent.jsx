import { HiRefresh } from 'react-icons/hi';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function ScrambleComponent(props) {
  return (
    <div className='flex items-center flex-col'>
      <h1 className="text-yellow-400 text-5xl">{props.scramble}</h1>
      <div>
        <button title='Last Scramble' onClick={() => props.setScramble(props.lastScramble)} className="p-5 text-white text-3xl" tabIndex='-1' disabled={props.lastScramble === '' ? true : false}><MdOutlineArrowBack /></button>
        <button title='New Scramble' onClick={() => props.generateScramble()} className="p-5 text-white text-3xl" tabIndex='-1'><HiRefresh /></button>
      </div>
    </div>
  )
}
