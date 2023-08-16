import IonIcon from '@reacticons/ionicons'

interface IScrollUpBtn {
  open?: boolean
}

const ScrollUpBtn = ({ open }: IScrollUpBtn) => {
  return (
    <section className={`fixed flex items-center pr-2 py-0.5 pl-0.5 bg-rose-300/40 bottom-2 rounded-bl-xl rounded-tl-xl duration-500 z-50 ${!open ? 'right-0' : "-right-16"}`}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}
        className='text-4xl group/arrow'>
        <span className='hidden group-hover/arrow:block'>
          <span className='flex items-center'>
            <IonIcon name='arrow-up-circle-sharp' />
          </span>
        </span>
        <span className='group-hover/arrow:hidden'>
          <span className='flex items-center'>
            <IonIcon name='arrow-up-circle-outline' />
          </span>
        </span>
      </button>
    </section>
  )
}

export default ScrollUpBtn