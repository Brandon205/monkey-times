export default function Loader({ show }) {
    return show ? <div className='animate-spin w-[50px] h-[50px] rounded-lg border-solid border-8 border-t-8 border-yellow-400'></div> : null
}