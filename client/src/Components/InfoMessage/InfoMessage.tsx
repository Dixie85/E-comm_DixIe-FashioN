import IonIcon from "@reacticons/ionicons"
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks"
import { infoMessageOpen, isInfoMessageOpen } from "../../redux/slices/infoMessage/infoMessageSlice"

const InfoMessage = () => {
  const dispatch = useAppDispatch()
  const  { isMessageOpen, message, isError }  =  useAppSelector(infoMessageOpen)

  return (
    <section className="relative">
      <article className={`absolute w-screen min-h-fit text-center z-50 shadow-lg text-lg text-gray-50 transform duration-500  ${isMessageOpen ? 'top-0' : '-top-28'} ${isError ? 'bg-red-500 ' : 'bg-green-500'} `}>
        <button
          className='flex absolute top-3 right-3 p-1 text-xl text-white self-end items-center rounded-full shadow-md bg-slate-800/25 border border-rose-50/70 hover:bg-slate-50/25 active:text-black active:bg-slate-50/80'
          onClick={() => dispatch(isInfoMessageOpen({ isOpen: false, message: '' }))}
        >
          <IonIcon name="close-outline"></IonIcon>
        </button>
        <p className="py-10">
          {message}
        </p>
      </article>
    </section>
  )
}

export default InfoMessage