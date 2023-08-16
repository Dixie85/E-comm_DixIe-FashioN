import IonIcon from '@reacticons/ionicons'

interface IScrollUpBtn {
  open?: boolean
}

const ScrollUpBtn = ({ open }: IScrollUpBtn) => {
  return (
    <section className={`fixed bottom-2 duration-500 ${!open ? 'right-2' : "-right-16" }`}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}
        className='text-4xl group/arrow'>
        <span className='hidden group-hover/arrow:block'>
          <IonIcon name='arrow-up-circle-sharp' />
        </span>
        <span className='group-hover/arrow:hidden'>
          <IonIcon name='arrow-up-circle-outline' />
        </span>
      </button>
    </section>
  )
}

export default ScrollUpBtn